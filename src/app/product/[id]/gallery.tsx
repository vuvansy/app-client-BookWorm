"use client";

import React, { useRef, useState } from "react";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

import ModalGallery from "./modal.gallery";

interface IProps {
}

const GalleryComponent = (props: IProps) => {

    const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const refGallery = useRef<ImageGallery>(null);

    const images = [
        {
            original: '/books/lennhatchuyendoi.webp',
            thumbnail: '/books/lennhatchuyendoi.webp',
        },
        {
            original: '/books/sachtienganh.jpeg',
            thumbnail: '/books/sachtienganh.jpeg',
        },
        {
            original: '/books/SachYHoc1.png',
            thumbnail: '/books/SachYHoc1.png',
        },
        {
            original: '/books/thientetheky.jpeg',
            thumbnail: '/books/thientetheky.jpeg',
        },
        {
            original: '/books/sachngoaingu.png',
            thumbnail: '/books/sachngoaingu.png',
        },

    ];

    const handleOnClickImage = () => {
        //get current index onClick
        setIsOpenModalGallery(true);
        setCurrentIndex(refGallery?.current?.getCurrentIndex() ?? 0)
    }


    return (
        <>
            <ImageGallery
                ref={refGallery}
                items={images}
                showPlayButton={false} //hide play button
                showFullscreenButton={false} //hide fullscreen button
                renderLeftNav={() => <></>} //left arrow === <> </>
                renderRightNav={() => <></>}//right arrow === <> </>
                slideOnThumbnailOver={true}  //onHover => auto scroll images
                onClick={() => handleOnClickImage()}
            />
            <ModalGallery
                isOpen={isOpenModalGallery}
                setIsOpen={setIsOpenModalGallery}
                currentIndex={currentIndex}
                items={images}
                title={"Tên sách"}
            />
        </>
    )

};

export default GalleryComponent;