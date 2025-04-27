import { Col, Image, Modal, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import ImageGallery from 'react-image-gallery';

interface IProps {
    isOpen: boolean;
    setIsOpen: (v: boolean) => void;
    currentIndex: number;
    items: {
        original: string;
        thumbnail: string;
    }[];
    title: string;
}

const ModalGallery = (props: IProps) => {
    const {
        isOpen, setIsOpen,
        currentIndex, items, title
    } = props;
    const [activeIndex, setActiveIndex] = useState(0);
    const refGallery = useRef<ImageGallery>(null);

    useEffect(() => {
        if (isOpen) {
            setActiveIndex(currentIndex);
        }
    }, [isOpen, currentIndex]);

    return (
        <Modal
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            footer={null}
            closable={false}
            width="60vw"
            className="modal-gallery"
        >
            <div className="w-full">
                <div className="flex flex-col xl:flex-row">
                    {/* Gallery */}
                    <div className="w-full xl:w-2/3">
                        <ImageGallery
                            ref={refGallery}
                            items={items}
                            showPlayButton={false}
                            showFullscreenButton={false}
                            startIndex={currentIndex}
                            showThumbnails={false}
                            onSlide={(i) => setActiveIndex(i)}
                            slideDuration={0}
                            showNav={false}
                        />
                    </div>

                    {/* Sidebar thumbnails + title */}
                    <div className="w-full xl:w-1/3">
                        <div className="pb-4 text-body text-lg font-semibold">{title}</div>
                        <div className="flex flex-wrap justify-center gap-3">
                            {items?.map((item, i) => (
                                <div key={`image-${i}`} className="relative">
                                    <Image
                                        alt={item.original}
                                        className="cursor-pointer rounded-md"
                                        width={100}
                                        height={100}
                                        src={item.original}
                                        preview={false}
                                        onClick={() => {
                                            refGallery?.current?.slideToIndex(i);
                                        }}
                                    />
                                    <div className={activeIndex === i ? "active" : ""}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalGallery;

