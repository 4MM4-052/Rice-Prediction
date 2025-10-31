export type RiceInput = {
  area: number
  perimeter: number
  major_axis_length: number
  minor_axis_length: number
  eccentricity: number
  convex_area: number
  extent: number
}

export type ApiResponse = {
  success: boolean
  message: string
  data: {
    model: string
    input: RiceInput
    prediction: string
  } | null
}
