import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, of, tap } from 'rxjs';
import { Image } from '../../models/image.model';
import { SSHTTPResponse } from '../../models/ss-http.model';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseUrl: string = 'http://localhost:5000/api/images/';  // Adjust this URL if necessary

  private imagesLoadingSubject = new BehaviorSubject<boolean>(false);
  public get imagesLoading$(): Observable<boolean> {
    return this.imagesLoadingSubject.asObservable();
  }

  private imageLoadingSubject = new BehaviorSubject<boolean>(false);
  public get imageLoading$(): Observable<boolean> {
    return this.imageLoadingSubject.asObservable();
  }

  private imagesErrorSubject = new BehaviorSubject<string | null>(null);
  public get imagesError$(): Observable<string | null> {
    return this.imagesErrorSubject.asObservable();
  }

  private currentImageErrorSubject = new BehaviorSubject<string | null>(null);
  public get currentImageError$(): Observable<string | null> {
    return this.currentImageErrorSubject.asObservable();
  }

  private currentImageSubject = new BehaviorSubject<Image | null>(null);
  public get currentImage$(): Observable<Image | null> {
    return this.currentImageSubject.asObservable();
  }

  private allImagesSubject = new BehaviorSubject<Image[] | null>(null);
  public get allImages$(): Observable<Image[] | null> {
    return this.allImagesSubject.asObservable();
  }

  private singleUpdateLoadingSubject = new BehaviorSubject<boolean>(false);
  public get singleUpdateLoading$(): Observable<boolean> {
    return this.singleUpdateLoadingSubject.asObservable();
  }

  private createUpdateErrSubject = new BehaviorSubject<string | null>(null);
  public get createUpdateErr$(): Observable<string | null> {
    return this.createUpdateErrSubject.asObservable();
  }

  constructor(private http: HttpClient) {}

  // Fetch all images
  refreshAllImages(): void {
    this.fetchAllImages().pipe(
      tap((res: Image[]) => {
        if (res && res.length > 0) {
          this.currentImageSubject.next(res[0]);
        }
      }),
      catchError((error: any) => {
        console.error(error);
        return of(error);
      })
    ).subscribe();
  }

  fetchAllImages(): Observable<Image[]> {
    this.imagesLoadingSubject.next(true);

    return this.http.get<SSHTTPResponse<[Image]>>(this.baseUrl)
      .pipe(
        tap((res: SSHTTPResponse<[Image]>) => {
          console.log('images: ', res.data)
          this.allImagesSubject.next(res.data);
        }),
        catchError((error: any) => {
          console.error('Error while fetching images:', error);
          this.imagesErrorSubject.next('Error while fetching images');
          return of([]);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
        })
      );
  }

  // Fetch an image by ID
  fetchImageById(imageId: string): Observable<Image | null> {
    this.imageLoadingSubject.next(true);
    return this.http.get<SSHTTPResponse<Image>>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap((res: SSHTTPResponse<Image>) => {
          this.currentImageSubject.next(res.data);
        }),
        catchError((error: any) => {
          console.error('Error while fetching image:', error);
          this.currentImageErrorSubject.next('Error while fetching image');
          return of(null);
        }),
        finalize(() => {
          this.imageLoadingSubject.next(false);
        })
      );
  }

  // Add a new image
  addImage(imageFile: File, name: string, description: string): Observable<Image | null> {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('name', name);
    formData.append('description', description);
  
    return this.http.post<Image>(this.baseUrl, formData)
      .pipe(
        tap((newImage: Image) => {
          this.allImagesSubject.next([...(this.allImagesSubject.value || []), newImage]);
        }),
        catchError((error: any) => {
          console.error('Error while adding image:', error);
          this.createUpdateErrSubject.next('Error while adding image');
          return of(null);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }
  

  // Update an existing image by ID
  updateImage(imageId: string, updatedImage: Image): Observable<Image | null> {
    this.imageLoadingSubject.next(true);
    this.singleUpdateLoadingSubject.next(true);
    this.createUpdateErrSubject.next(null);

    return this.http.put<Image>(`${this.baseUrl}${imageId}`, updatedImage)
      .pipe(
        tap((res: Image) => {
          // Update the current image if it's the one being updated
          if (this.currentImageSubject.value?._id === imageId) {
            this.currentImageSubject.next(res);
          }

          // Update the image in the image list
          const currentImages = this.allImagesSubject.value;
          if (currentImages && currentImages.length > 0) {
            const updatedImages = currentImages.map((img: Image) =>
              img._id === imageId ? res : img
            );
            this.allImagesSubject.next(updatedImages || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while updating image:', error);
          this.createUpdateErrSubject.next('Error while updating image');
          return of(null);
        }),
        finalize(() => {
          this.imageLoadingSubject.next(false);
          this.singleUpdateLoadingSubject.next(false);
        })
      );
  }

  // Delete an image by ID
  deleteImage(imageId: string): Observable<boolean> {
    this.imagesLoadingSubject.next(true);

    return this.http.delete<void>(`${this.baseUrl}${imageId}`)
      .pipe(
        tap(() => {
          // Remove the image from the image list
          const currentImages = this.allImagesSubject.value;
          if (currentImages && currentImages.length > 0) {
            const updatedImages = currentImages.filter((img: Image) => img._id !== imageId);
            this.allImagesSubject.next(updatedImages || []);
          }
        }),
        catchError((error: any) => {
          console.error('Error while deleting image:', error);
          this.imagesErrorSubject.next('Error while deleting image');
          return of(false);
        }),
        finalize(() => {
          this.imagesLoadingSubject.next(false);
        })
      );
  }

  // addToGallery(inputObj: Image): Observable<Image | null> {
  //   const galleryData = new FormData;
  //   galleryData.append('name', inputObj.name);
  //   galleryData.append('description', inputObj.description);
  //   galleryData.append('image', inputObj.image);
  
  //   this.basicService.changeIsLoading(true); // Start loading
  //   this.currentGalleryItemUpdateLoadingSubject.next(true);
    
  //   return this.http.post<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.create}`, galleryData)
  //     .pipe(
  //       tap((res) => {
  //         const newGalleryItem = res.data as GalleryItem;
  
  //         // Update the state with the new gallery item
  //         this.currentGallerySubject.next([...this.currentGallerySubject.getValue(), newGalleryItem]);
  
  //         // Notify success
  //         this.notificationService.notifySuccess({message: res.message});

  //         return newGalleryItem;
  //       }),
  //       catchError(error => {
  //         // Handle the error appropriately
  //         console.error('Error while adding gallery item:', error);

  //         let errorMessage = 'Error while adding gallery item';
  //         if (error && error.error && error.error.message) {
  //           errorMessage = error.error.message;
  //         }
  
  //         // Notify failure
  //         this.notificationService.notifyError({message: errorMessage});

  //         return of(null);
  //       }),
  //       finalize(() => {
  //         this.basicService.changeIsLoading(false); // Stop loading
  //         this.currentGalleryItemUpdateLoadingSubject.next(false);
  //       })
  //     );
  // }
  
  // getGallery(): void {
  //   console.log('getGallery http req -------------------------------------------------------------');
  
  //   // this.basicService.changeIsLoading(true); // Start loading
  
  //   this.http.get<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.getAll}`)
  //     .pipe(
  //       tap((res) => {

  //         const galleryItems = res.data as GalleryItem[];
  
  //         // Update your state with the fetched gallery items.
  //         // Assuming you have a BehaviorSubject for gallery items, like the other methods:
  //         this.currentGallerySubject.next(galleryItems);
  
  //         // Optional: Notify success
  //         this.notificationService.notifySuccess({message: res.message});
  //       }),
  //       catchError(error => {
  //         // Handle the error appropriately
  //         console.error('Error while fetching gallery items:', error);
  
  //         let errorMessage = 'Error while fetching gallery items';
  //         if (error && error.error && error.error.message) {
  //           errorMessage = error.error.message;
  //         }

  //         // Notify failure
  //         this.notificationService.notifyError({message: errorMessage});
  
  //         return of(null);
  //       }),
  //       finalize(() => {
  //         this.basicService.changeIsLoading(false); // Stop loading
  //       })
  //     )
  //     .subscribe(); // Subscribing here ensures that the request is made
  // }  

  // updateImageInfo(newGalItem: GalleryItem, id: string): void {
  //   this.basicService.changeIsLoading(true); // Start loading
  //   this.currentGalleryItemUpdateLoadingSubject.next(true);
  
  //   this.http.put<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.updateInfo}/${id}`, newGalItem)
  //     .pipe(
  //       tap((res) => {

  //         const updatedGalItem = res.data as GalleryItem;
          
  //         const updatedGallery = this.currentGallerySubject.getValue().map(item => {
  //           return item._id === id ? updatedGalItem : item;
  //         });
          
  //         this.currentGallerySubject.next(updatedGallery);

  //         // Notify success
  //         this.notificationService.notifySuccess({message: res.message});
  //       }),
  //       catchError(error => {
  //         // Handle the error appropriately
  //         console.error('Error while updating gallery item:', error);

  //         let errorMessage = 'Error while updating gallery item';
  //         if (error && error.error && error.error.message) {
  //           errorMessage = error.error.message;
  //         }

  //         // Notify failure
  //         this.notificationService.notifyError({message: errorMessage});

  //         return of(null);
  //       }),
  //       finalize(() => {
  //         this.basicService.changeIsLoading(false); // Stop loading
  //         this.currentGalleryItemUpdateLoadingSubject.next(false);
  //       })
  //     )
  //     .subscribe();
  // }

  // updateImageFile(newImage: File, id: string): void {
  //   const imageData = new FormData();
  //   imageData.append('image', newImage);

  //   this.basicService.changeIsLoading(true); // Start loading
  
  //   this.http.put<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.updateFile}/${id}`, imageData)
  //     .pipe(
  //       tap((res) => {
            
  //           const updatedGalItem = res.data as GalleryItem;
            
  //           const updatedGallery = this.currentGallerySubject.getValue().map(item => {
  //             return item._id === id ? updatedGalItem : item;
  //           });
            
  //           this.currentGallerySubject.next(updatedGallery);
  
  //           // Notify success
  //           this.notificationService.notifySuccess({message: res.message});
  //         }),
  //         catchError(error => {
  //           // Handle the error appropriately
  //           console.error('Error while updating gallery item:', error);
  
  //           let errorMessage = 'Error while updating gallery item';
  //           if (error && error.error && error.error.message) {
  //             errorMessage = error.error.message;
  //           }
  
  //           // Notify failure
  //           this.notificationService.notifyError({message: errorMessage});
  
  //           return of(null);
  //         }),
  //         finalize(() => {
  //           this.basicService.changeIsLoading(false); // Stop loading
  //           this.currentGalleryItemUpdateLoadingSubject.next(false);
  //         })
  //     )
  //     .subscribe();
  // }

  
  // deleteImage(imgId: string): void {
  //   this.basicService.changeIsLoading(true); // Start loading

  //   this.http.delete<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.delete}/${imgId}`)
  //     .pipe(
  //       tap((res) => {
  //         this.currentGallerySubject.next(this.currentGallerySubject.getValue().filter(item => item._id !== imgId));

  //         // Notify success
  //         this.notificationService.notifySuccess({message: res.message});
  //       }),
  //       catchError(error => {
  //         // Handle the error appropriately
  //         console.error('Error while deleting gallery item:', error);

  //         let errorMessage = 'Error while deleting gallery item';
  //         if (error && error.error && error.error.message) {
  //           errorMessage = error.error.message;
  //         }

  //         // Notify failure
  //         this.notificationService.notifyError({message: errorMessage});

  //         return of(null);
  //       }),
  //       finalize(() => {
  //         this.basicService.changeIsLoading(false); // Stop loading
  //       })
  //     )
  //     .subscribe();
  // }
  
  // getAllGalleryItemData(galItemId: string): void {
  //   const foundCurrentGalItem = this.currentGallerySubject.getValue().find(galItem => galItem._id === galItemId);
  //   if (foundCurrentGalItem) {
  //     console.log('foundCurrentGalItem', foundCurrentGalItem);
  //     this.currentGalleryItemSubject.next(foundCurrentGalItem);
  //   } else {
  //     console.log('get all gallery item data http ------------------------------------------');
  //     this.basicService.changeIsLoading(true);
  //     this.http.get<BaseApiResponse>(`${environment.base_url}${environment.endpoints.gallery.getOne}/${galItemId}`)
  //       .pipe(
  //         tap((res) => {

  //           const galItem = res.data as GalleryItem;

  //           this.currentGalleryItemSubject.next(galItem);
  //         }),
  //         catchError(error => {
  //           // Handle the error appropriately
  //           console.error('Error while getting gallery item:', error);

  //           let errorMessage = 'Error while fetching gallery item';
  //           if (error && error.error && error.error.message) {
  //             errorMessage = error.error.message;
  //           }
    
  //           // Notify failure
  //           this.notificationService.notifyError({message: errorMessage});
    
  //           return of(null);
  //         }),
  //         finalize(() => {
  //           this.basicService.changeIsLoading(false); // Stop loading
  //         })
  //       )
  //       .subscribe();
  //   }
  // }

}