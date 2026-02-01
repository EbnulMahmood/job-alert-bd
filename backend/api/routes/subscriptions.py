"""
Subscription-related API routes.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from database.connection import get_db
from api.models import (
    Subscription,
    SubscriptionCreate,
    SubscriptionUpdate,
    SubscriptionResponse,
)

router = APIRouter(prefix="/subscriptions", tags=["Subscriptions"])


@router.post("/", response_model=SubscriptionResponse)
async def create_subscription(
    subscription_data: SubscriptionCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new subscription for job alerts.
    Can be email-based, push notification-based, or both.
    """
    # Check if subscription already exists with same email or push endpoint
    if subscription_data.email:
        existing_query = select(Subscription).where(
            Subscription.email == subscription_data.email,
            Subscription.is_active == True,
        )
        existing = await db.execute(existing_query)
        if existing.scalar_one_or_none():
            raise HTTPException(
                status_code=400,
                detail="Subscription with this email already exists"
            )

    if subscription_data.push_endpoint:
        existing_query = select(Subscription).where(
            Subscription.push_endpoint == subscription_data.push_endpoint,
            Subscription.is_active == True,
        )
        existing = await db.execute(existing_query)
        if existing.scalar_one_or_none():
            raise HTTPException(
                status_code=400,
                detail="Subscription with this push endpoint already exists"
            )

    # Create subscription
    data = subscription_data.model_dump()
    if data.get("push_keys"):
        data["push_keys"] = data["push_keys"]

    subscription = Subscription(**data)
    db.add(subscription)
    await db.commit()
    await db.refresh(subscription)

    return SubscriptionResponse.model_validate(subscription)


@router.get("/{subscription_id}", response_model=SubscriptionResponse)
async def get_subscription(
    subscription_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Get a subscription by ID."""
    query = select(Subscription).where(Subscription.id == subscription_id)
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()

    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")

    return SubscriptionResponse.model_validate(subscription)


@router.put("/{subscription_id}", response_model=SubscriptionResponse)
async def update_subscription(
    subscription_id: int,
    subscription_data: SubscriptionUpdate,
    db: AsyncSession = Depends(get_db),
):
    """Update a subscription."""
    query = select(Subscription).where(Subscription.id == subscription_id)
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()

    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")

    update_data = subscription_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(subscription, field, value)

    await db.commit()
    await db.refresh(subscription)

    return SubscriptionResponse.model_validate(subscription)


@router.delete("/{subscription_id}")
async def delete_subscription(
    subscription_id: int,
    db: AsyncSession = Depends(get_db),
):
    """Unsubscribe (soft delete)."""
    query = select(Subscription).where(Subscription.id == subscription_id)
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()

    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")

    subscription.is_active = False
    await db.commit()

    return {"message": "Unsubscribed successfully"}


@router.post("/unsubscribe-by-email")
async def unsubscribe_by_email(
    email: str,
    db: AsyncSession = Depends(get_db),
):
    """Unsubscribe by email address."""
    query = select(Subscription).where(
        Subscription.email == email,
        Subscription.is_active == True,
    )
    result = await db.execute(query)
    subscription = result.scalar_one_or_none()

    if not subscription:
        raise HTTPException(status_code=404, detail="Subscription not found")

    subscription.is_active = False
    await db.commit()

    return {"message": "Unsubscribed successfully"}
