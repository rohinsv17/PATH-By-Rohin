import Image from "next/image";
import TagList from "@/components/TagList";
import type { Program } from "@/content/programs";

// Displays one program with a text column and a stack of images, the image side and background color come from the data
export default function ProgramCard({ title, description, tags, images, imageSide, bgClass }: Program) {

    // Reverses the row on desktop when the images should sit on the left
    const direction = imageSide === "left" ? "md:flex-row-reverse" : "md:flex-row";

    return (
        <div className = {`flex flex-col gap-8 rounded-lg border border-gray-200 p-8 ${direction} ${bgClass}`}>

            {/* Text column with title, description, and skill tags */}
            <div className = "flex flex-1 flex-col justify-center gap-3">
                <h3 className = "text-2xl font-semibold text-gray-900">
                    {title}
                </h3>

                {/* Each paragraph is indented on its first line */}
                {description.map((paragraph, index) => (
                    <p key = {index} className = "indent-8 text-sm text-gray-600">
                        {paragraph}
                    </p>
                ))}
                <TagList label = "Concepts Taught:" tags = {tags} />
            </div>

            {/* Image column, images keep their natural proportions and spread evenly across the height of the text */}
            <div className = "flex flex-1 flex-col justify-between gap-4">
                {images.map((image, index) => (
                    <Image key = {image} src = {image} alt = {`${title} photo ${index + 1}`} width = {1200} height = {800} sizes = "(min-width: 768px) 50vw, 100vw" className = "h-auto w-full rounded" />
                ))}
            </div>
        </div>
    );
}