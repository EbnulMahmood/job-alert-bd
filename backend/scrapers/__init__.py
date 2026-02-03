from .base_scraper import BaseScraper
from .cefalo_scraper import CefaloScraper
from .kaz_scraper import KazScraper
from .selise_scraper import SeliseScraper
from .enosis_scraper import EnosisScraper
from .bjit_scraper import BJITScraper
from .samsung_scraper import SamsungScraper
from .therap_scraper import TherapScraper
from .brainstation_scraper import BrainStationScraper
from .bangladesh_bank_scraper import BangladeshBankScraper
from .a2i_scraper import A2IScraper
from .chaldal_scraper import ChaldalScraper
from .linkedin_dotnet_scraper import LinkedInDotNetScraper

ALL_SCRAPERS = [
    CefaloScraper,
    KazScraper,
    SeliseScraper,
    EnosisScraper,
    BJITScraper,
    SamsungScraper,
    TherapScraper,
    BrainStationScraper,
    BangladeshBankScraper,
    A2IScraper,
    ChaldalScraper,
    LinkedInDotNetScraper,
]

__all__ = [
    "BaseScraper",
    "CefaloScraper",
    "KazScraper",
    "SeliseScraper",
    "EnosisScraper",
    "BJITScraper",
    "SamsungScraper",
    "TherapScraper",
    "BrainStationScraper",
    "BangladeshBankScraper",
    "A2IScraper",
    "ChaldalScraper",
    "LinkedInDotNetScraper",
    "ALL_SCRAPERS",
]
