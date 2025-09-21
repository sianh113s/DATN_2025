import { BASE_URL } from "../constants/app"
export const getImageProduct = (imgName) => {
  return `${BASE_URL}/uploads/images/products/${imgName}`
}

