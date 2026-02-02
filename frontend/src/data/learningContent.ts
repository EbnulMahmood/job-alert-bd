/**
 * Daily Learning Content for Company-Specific Interview Preparation
 * Each company has a structured learning track with topics specific to their interview process
 */

// Re-export types from dedicated types file
export type { LearningTopic, CompanyTrack } from './learningTypes'
import type { CompanyTrack } from './learningTypes'

// Import all tracks from individual files
import { cefaloTrack } from './tracks/cefaloTrack'
import { bangladeshBankTrack } from './tracks/bangladeshBankTrack'
import { kazSoftwareTrack } from './tracks/kazSoftwareTrack'
import { seliseTrack } from './tracks/seliseTrack'
import { samsungTrack } from './tracks/samsungTrack'
import { enosisTrack } from './tracks/enosisTrack'
import { bjitTrack } from './tracks/bjitTrack'
import { therapTrack } from './tracks/therapTrack'
import { brainStationTrack } from './tracks/brainStationTrack'

// Re-export individual tracks for direct import
export {
  cefaloTrack,
  bangladeshBankTrack,
  kazSoftwareTrack,
  seliseTrack,
  samsungTrack,
  enosisTrack,
  bjitTrack,
  therapTrack,
  brainStationTrack,
}

// Export all tracks
export const allTracks: CompanyTrack[] = [
  samsungTrack,
  cefaloTrack,
  seliseTrack,
  kazSoftwareTrack,
  therapTrack,
  enosisTrack,
  brainStationTrack,
  bjitTrack,
  bangladeshBankTrack,
]

export const getTrackByCompany = (companyName: string): CompanyTrack | undefined => {
  return allTracks.find(track =>
    track.companyName.toLowerCase() === companyName.toLowerCase()
  )
}
