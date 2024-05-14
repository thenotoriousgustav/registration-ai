// "use client";

// import AvailableAssets from "@/app/@admin/(layout)/profil-unit/_components/available-assets";
// import React from "react";

// import { Button } from "../ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "../ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "../ui/dropdown-menu";
// import { Skeleton } from "../ui/skeleton";
// import { useToast } from "../ui/use-toast";
// import { FormLabel } from "./admin/Form";
// import { Card } from "./card";
// import Image from "./image";

// import { cn } from "@/lib/utils";

// import { GenericData } from "@/types";

// import {
//   LucideEdit2,
//   LucideTrash,
//   MoreVertical,
//   OctagonAlert,
// } from "lucide-react";
// import { FiUploadCloud } from "react-icons/fi";
// import { LuImage } from "react-icons/lu";

// export function MultiImagePickerSkeleton() {
//   return (
//     <div className="space-y-4">
//       <div className="mt-2">
//         <div className="h-48 rounded-lg border border-border p-2">
//           <Skeleton className="size-full" />
//         </div>
//       </div>
//       <div className="flex flex-col gap-3">
//         <FormLabel>Daftar Gambar</FormLabel>
//         {Array.from({ length: 3 }).map((_, index) => (
//           <div
//             key={index}
//             className="flex h-[72px] w-full items-center justify-between rounded-lg border px-4 py-4"
//           >
//             <div className="flex h-full items-center gap-4">
//               <Skeleton className="aspect-square h-full" />
//               <div className="flex flex-col justify-center gap-0.5">
//                 <Skeleton className="h-[14px] w-32" />
//                 <Skeleton className="h-[12px] w-16" />
//               </div>
//             </div>
//             <div>
//               <Skeleton className="size-8" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// type TBase = {
//   name: string;
//   tag?: string;
// };

// export type TUrlProps = TBase & {
//   type: "url";
//   id: string;
//   url: string;
// };

// export type TImageProps = TBase & {
//   type: "file";
//   file: File;
// };

// export type TMultiImageType = (TUrlProps | TImageProps)[];

// type TImageItemProps = {
//   aspectRatio?: number;
//   images: TMultiImageType;
//   setImages: React.Dispatch<React.SetStateAction<TMultiImageType>>;

//   image: TUrlProps | TImageProps;
//   editable?: boolean;

//   assetLabelFunction?: (assetUrl: string) => string;
//   assetLabelTag?: string | null;

//   noAction?: boolean;
// };

// function ImageItem(props: TImageItemProps) {
//   const {
//     aspectRatio = 16 / 9,
//     image,
//     images,
//     setImages,
//     editable,
//     assetLabelFunction,
//     assetLabelTag,
//     noAction,
//   } = props;

//   const { toast } = useToast();

//   const ASPECT_RATIO_SCALE = 1500;
//   const finalAspectRatio = aspectRatio * ASPECT_RATIO_SCALE; // To avoid scaling issues

//   const nameInputRef = React.useRef<HTMLInputElement>(null);

//   const [menuOpen, setMenuOpen] = React.useState(false);
//   const [isImageViewerOpen, setIsImageViewerOpen] = React.useState(false);
//   const [isEditing, setIsEditing] = React.useState(false);

//   const [imageUrl, setImageUrl] = React.useState<string>("");
//   const [imageName, setImageName] = React.useState<string>("");
//   const [initialImageName, setInitialImageName] = React.useState<string>("");
//   const [imageSize, setImageSize] = React.useState<number>(0);
//   const [imageExt, setImageExt] = React.useState<string>("");
//   const [imageSizeType, setImageSizeType] = React.useState<string>("");

//   React.useEffect(() => {
//     if (image.type === "file") {
//       const { file } = image;

//       const SIZE_THRESHOLD = /* 0.01mb */ 1024 * 1024 * 0.01;

//       const ext = file.name.split(".").pop();
//       const name = file.name.replace(`.${ext}`, "");

//       // Set image size in mb, if below 0.01mb, convert to kb
//       const size = file.size;

//       setImageName(name);
//       setInitialImageName(name);
//       setImageSize(size);
//       setImageExt(ext!);
//       setImageSizeType(file.size > SIZE_THRESHOLD ? "mb" : "kb");

//       // View image
//       const fileReader = new FileReader();

//       fileReader.onload = (e) => {
//         setImageUrl(e.target?.result as string);
//       };

//       fileReader.readAsDataURL(file);
//     } else if (image.type === "url") {
//       setImageUrl(image.url);
//       setInitialImageName(image.name!);
//       setImageName(image.name!);

//       setImageExt(image.url.split(".").pop()!);
//     }
//   }, []);

//   const handleEdit = () => {
//     setIsEditing(true);
//   };
//   const handleDelete = () => {
//     if (image.type === "url") {
//       setImages(
//         images.filter(
//           (img) => img.type === "file" || (img as TUrlProps).id !== image.id
//         )
//       );
//     } else if (image.type === "file") {
//       setImages(
//         images.filter(
//           (img) =>
//             img.type === "url" ||
//             (img as TImageProps).file.name !== image.file.name
//         )
//       );
//     }
//   };
//   const handleEditSave = () => {
//     if (imageName === "") {
//       setImageName(initialImageName);
//       setIsEditing(false);
//       return;
//     }

//     // Update image name
//     setImages(
//       images.map((img) =>
//         img === image
//           ? {
//               ...img,
//               name: imageName,
//             }
//           : img
//       )
//     );

//     setInitialImageName(imageName);
//     setIsEditing(false);
//   };

//   return (
//     <>
//       <Dialog open={isImageViewerOpen} onOpenChange={setIsImageViewerOpen}>
//         {/* Item */}
//         <DialogTrigger asChild>
//           <div
//             onKeyDown={(e) => {
//               if (e.key === "Enter") handleEditSave();
//             }}
//             className="flex h-[72px] w-full cursor-pointer items-stretch justify-between gap-4 rounded-lg border border-border bg-white p-4 duration-150 hover:bg-zinc-100"
//           >
//             <div className="flex grow items-center gap-3 ">
//               <LuImage
//                 size={24}
//                 className="aspect-square shrink-0 text-primary"
//               />
//               <div className="flex h-full w-full grow items-center space-y-0.5">
//                 {!isEditing ? (
//                   <>
//                     <div className="flex flex-col justify-center gap-0.5">
//                       <div className="line-clamp-1 text-sm font-medium">
//                         {initialImageName || (
//                           <Skeleton className="h-[14px] w-32" />
//                         )}
//                       </div>
//                       <div className="flex items-center gap-2 text-xs text-zinc-600">
//                         <div>
//                           {(imageExt && `.${imageExt.toLowerCase()}`) || (
//                             <Skeleton className="h-[12px] w-16" />
//                           )}
//                         </div>
//                         {imageSize > 0 && (
//                           <div>
//                             {imageSizeType === "mb"
//                               ? (imageSize / (1024 * 1024)).toFixed(2)
//                               : (imageSize / 1024).toFixed(2)}{" "}
//                             {imageSizeType}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                     {imageSize === 0 && (
//                       <div className="ms-auto ps-2 text-right text-xs font-medium text-primary">
//                         {assetLabelTag != null
//                           ? assetLabelTag
//                           : assetLabelFunction
//                           ? assetLabelFunction(imageUrl)
//                           : "Asset"}
//                       </div>
//                     )}
//                   </>
//                 ) : (
//                   <>
//                     <input
//                       value={imageName}
//                       onChange={(e) => setImageName(e.target.value)}
//                       onClick={(e) => e.stopPropagation()}
//                       ref={nameInputRef}
//                       autoFocus
//                       placeholder={initialImageName}
//                       className="h-full w-full rounded-md border border-border px-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
//                     />
//                   </>
//                 )}
//               </div>
//             </div>
//             {!noAction ? (
//               !isEditing ? (
//                 <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
//                   <DropdownMenuTrigger asChild>
//                     <button className="grid size-8 shrink-0 place-items-center self-center rounded-full duration-150 hover:bg-zinc-200">
//                       <MoreVertical size={16} className="text-zinc-950" />
//                     </button>
//                   </DropdownMenuTrigger>
//                   <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
//                     <DropdownMenuGroup>
//                       <DropdownMenuLabel>Aksi</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       {editable && (
//                         <DropdownMenuItem
//                           className="gap-3"
//                           onClick={handleEdit}
//                         >
//                           <div>
//                             <LucideEdit2 size={16} />
//                             <span>Edit</span>
//                           </div>
//                         </DropdownMenuItem>
//                       )}
//                       <DropdownMenuItem
//                         className="gap-3"
//                         onClick={handleDelete}
//                       >
//                         <div className="text-red-600">
//                           <LucideTrash size={16} />
//                           <span>Hapus</span>
//                         </div>
//                       </DropdownMenuItem>
//                     </DropdownMenuGroup>
//                   </DropdownMenuContent>
//                 </DropdownMenu>
//               ) : (
//                 <Button
//                   size="sm"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleEditSave();
//                   }}
//                 >
//                   Simpan
//                 </Button>
//               )
//             ) : null}
//           </div>
//         </DialogTrigger>

//         {/* Image Viewer */}
//         <DialogContent className="mx-auto max-h-[80vh] w-full max-w-[min(1024px,100%-2rem)]">
//           <DialogHeader>
//             <DialogTitle asChild>
//               <h3 className="font-semibold">
//                 {initialImageName}
//                 {imageSize > 0 && `.${imageExt}`}
//               </h3>
//             </DialogTitle>
//           </DialogHeader>
//           <div className="relative isolate aspect-video h-full overflow-hidden rounded-lg border border-border bg-zinc-100">
//             {image.type === "file" ? (
//               <>
//                 <img
//                   width={ASPECT_RATIO_SCALE}
//                   height={finalAspectRatio}
//                   alt={`Preview ${initialImageName}`}
//                   className="relative z-10 mx-auto h-full w-fit  border-x border-border bg-white object-contain "
//                   src={imageUrl}
//                 />
//               </>
//             ) : (
//               <>
//                 <Image
//                   width={ASPECT_RATIO_SCALE}
//                   height={finalAspectRatio}
//                   alt={`Preview ${initialImageName}`}
//                   className="relative z-10 mx-auto h-full w-fit  border-x border-border bg-white object-contain"
//                   src={imageUrl}
//                   errorComponent={<EmptyCard />}
//                 />
//               </>
//             )}
//           </div>
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// }

// function EmptyCard() {
//   return (
//     <Card
//       orientation="horizontal"
//       className={cn(
//         "w-full items-center justify-center gap-2 rounded-lg border-primary bg-blue-50/50"
//       )}
//     >
//       <OctagonAlert strokeWidth={1.3} className="text-primary" />

//       <span className="text-sm font-medium">Tidak ada gambar</span>
//     </Card>
//   );
// }

// type TImageFieldProps = {
//   inputRef: React.RefObject<HTMLInputElement>;
//   onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
//   description?: React.ReactNode;
//   disabled?: boolean;
// };

// function ImageField(props: TImageFieldProps) {
//   const { inputRef, description, onFileUpload, disabled = true } = props;

//   const { toast } = useToast();

//   const handleFieldClick = () => {
//     if (disabled) {
//       toast({
//         variant: "destructive",
//         title: "Tidak bisa mengupload gambar",
//         description: "Maksimal gambar sudah tercapai",
//       });
//       return;
//     }

//     inputRef.current?.click();
//   };

//   return (
//     <>
//       <div
//         className={cn(
//           "group grid place-items-center overflow-hidden rounded-lg border border-border",
//           !disabled ? "bg-white" : "bg-zinc-100"
//         )}
//       >
//         <button
//           onClick={handleFieldClick}
//           type="button"
//           className={cn(
//             "flex size-full min-h-32 grow flex-col items-center justify-center space-y-2 rounded p-6 duration-150 ",
//             !disabled ? "cursor-pointer hover:bg-zinc-50" : "cursor-not-allowed"
//           )}
//         >
//           <FiUploadCloud size={28} className="text-primary" />

//           <div className="text-sm text-zinc-500">
//             {description ?? "Pilih Gambar"}
//           </div>
//         </button>
//       </div>

//       <input
//         type="file"
//         onChange={onFileUpload}
//         ref={inputRef}
//         className="hidden"
//         multiple
//       />
//     </>
//   );
// }

// type TMultiImagePickerProps = {
//   onSelectChange?: (images: string[]) => void;

//   images: TMultiImageType;
//   setImages: React.Dispatch<React.SetStateAction<TMultiImageType>>;

//   maxImages?: number;
//   description?: React.ReactNode;

//   editable?: boolean;
//   assetPicker?: React.ReactNode;

//   assetDeleteWarning?: boolean;
//   assetLabelFunction?: (assetUrl: string) => string;
//   assetLabelTags?: GenericData;
//   disabled?: boolean;
//   noImageInput?: boolean;
//   noAction?: boolean;

//   listLabel?: string;
// };

// export default function MultiImagePicker(props: TMultiImagePickerProps) {
//   const {
//     maxImages = 0,
//     description = (
//       <div>
//         <p className="text-sm text-zinc-500">
//           Upload gambar yang ingin kamu gunakan
//         </p>
//       </div>
//     ),
//     images,
//     setImages,
//     assetDeleteWarning = true,
//     editable = false,
//     disabled = false,
//     noImageInput = false,
//     assetPicker,
//     assetLabelFunction,
//     assetLabelTags,
//     noAction = false,
//     listLabel = "Daftar Gambar",
//   } = props;

//   const { toast } = useToast();

//   const fileInputRef = React.useRef<HTMLInputElement>(null);

//   function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
//     const files = Array.from(event.target.files || []);

//     let queuedImages: File[] = [];

//     files.forEach((file) => {
//       if (file && !file.type.startsWith("image")) {
//         toast({
//           variant: "destructive",
//           description:
//             "Ada file yang bukan tipe gambar, silahkan upload gambar lainnya",
//         });
//         return;
//       } else if (file) {
//         // Check if image is already in the list
//         const isImageExist = images.some(
//           (img) => img.type !== "url" && img.file.name === file.name
//         );

//         if (isImageExist) {
//           toast({
//             description:
//               "Ada gambar yang sudah ada di daftar, silahkan upload gambar lainnya",
//           });
//           return;
//         }

//         queuedImages.push(file);
//         fileInputRef.current!.value = "";
//       } else {
//         toast({
//           variant: "destructive",
//           description: "Terjadi kesalahan, silahkan coba lagi",
//         });
//       }
//     });

//     // Add images to list
//     setImages([
//       ...images,
//       ...queuedImages.map((file) => {
//         const fileExt = file.name.split(".").pop();
//         const fileName = file.name.replace(`.${fileExt}`, "");

//         return {
//           file: file,
//           name: fileName,
//           type: "file",
//         } satisfies TImageProps;
//       }),
//     ]);
//   }

//   // React.useEffect(() => {
//   // 	if (onImagesChange) onImagesChange(images);
//   // }, [images]);

//   return (
//     <div>
//       {!noImageInput && (
//         <ImageField
//           inputRef={fileInputRef}
//           onFileUpload={handleFileUpload}
//           description={description}
//           disabled={disabled || (maxImages !== 0 && images.length >= maxImages)}
//         />
//       )}

//       {assetPicker && <div className="mt-3">{assetPicker}</div>}

//       {listLabel && (
//         <div className={cn(!noImageInput ? "mt-5" : null)}>
//           <span className="text-sm font-medium">{listLabel}</span>
//         </div>
//       )}

//       <div className="mt-1 flex flex-col gap-3">
//         {images.length > 0 ? (
//           images.map((image, index) => (
//             <ImageItem
//               key={image.type === "file" ? image.file.name : image.id}
//               image={image}
//               images={images}
//               setImages={setImages}
//               editable={editable}
//               assetLabelFunction={assetLabelFunction}
//               assetLabelTag={assetLabelTags?.[image.tag || ""]}
//               noAction={noAction}
//             />
//           ))
//         ) : (
//           <EmptyCard />
//         )}
//       </div>
//     </div>
//   );
// }
