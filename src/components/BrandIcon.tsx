// Icon drawn from an svg file in the public folder takes on the color of the surrounding text
export default function BrandIcon({ src }: { src: string }) {
    return (
        <span aria-hidden = "true" className = "inline-block h-[18px] w-[18px] shrink-0 bg-current" style = {{ maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskRepeat: "no-repeat", WebkitMaskRepeat: "no-repeat", maskPosition: "center", WebkitMaskPosition: "center", maskSize: "contain", WebkitMaskSize: "contain" }} />
    );
}