// image.model.ts
export interface Image {
    name: string,
    description: string,
    image: File,
    imagePath: string,
    _id?: string,
}
  