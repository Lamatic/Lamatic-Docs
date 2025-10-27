// Compatibility shim for Nextra 2.x getPagesUnderRoute
// In Nextra 4, this functionality needs to be implemented differently
// For now, this returns an empty array to allow builds to proceed

export function getPagesUnderRoute(route: string): any[] {
  console.warn('getPagesUnderRoute is not yet implemented for Nextra 4. Components using this will need to be updated.')
  return []
}
