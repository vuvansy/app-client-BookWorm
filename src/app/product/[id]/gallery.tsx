"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import ModalGallery from "./modal.gallery";

interface IProps {
    currentBook: IBookTable | null;
}

const GalleryComponent = (props: IProps) => {
    const { currentBook } = props;

    const [imageGallery, setImageGallery] = useState<{
        original: string;
        thumbnail: string;
        originalClass: string;
        thumbnailClass: string;
    }[]>([])

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFavorite, setIsFavorite] = useState(false); // Trạng thái yêu thích

    const refGallery = useRef<ImageGallery>(null);

    useEffect(() => {
        if (currentBook) {
            //build images 
            const images = [];
            if (currentBook.image) {
                images.push(
                    {
                        original: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${currentBook.image}`,
                        thumbnail: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${currentBook.image}`,
                        originalClass: "w-full h-[450px] object-contain",
                        thumbnailClass: "!w-[100px] !h-[100px]"
                    },
                )
            }
            if (currentBook.slider) {
                currentBook.slider?.map(item => {
                    images.push(
                        {
                            original: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item}`,
                            thumbnail: `${process.env.NEXT_PUBLIC_API_ENDPOINT}/images/book/${item}`,
                            originalClass: "w-full h-[450px] object-contain",
                            thumbnailClass: "w-[100px] h-[100px] object-contain"
                        },
                    )
                })
            }
            setImageGallery(images)
        }
    }, [currentBook])


    const handleOnClickImage = () => {
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }

    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <>
            <ImageGallery
                key={currentBook?._id}
                ref={refGallery}
                items={imageGallery}
                showPlayButton={false} //hide play button
                showFullscreenButton={false} //hide fullscreen button
                renderLeftNav={() => <></>} //left arrow === <> </>
                renderRightNav={() => <></>}//right arrow === <> </>
                slideOnThumbnailOver={true}  //onHover => auto scroll images
                onClick={() => handleOnClickImage()}
                thumbnailPosition="bottom"
                additionalClass="custom-gallery"

            />

            <button
                onClick={handleToggleFavorite}
                className="absolute top-[180px] md:top-[160px] lg:top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-red-100 transition"
            >
                {isFavorite ? (
                    <FaHeart className="text-red-500 text-[20px]" />
                ) : (
                    <FaRegHeart className="text-gray-500 text-[20px]" />
                )}
            </button>

            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={imageGallery}
                title={currentBook?.name ?? ""}
            />
        </>
    )

};

export default GalleryComponent;