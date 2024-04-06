import Image from "next/image";
import { cn } from "../../lib/utils";


function ImageSlider() {
  const images = [
    { url: "/model1.jpeg", width: 500, height: 500 },
    { url: "/model2.jpeg", width: 500, height: 500 },
    { url: "/model3.jpeg", width: 500, height: 500 },
  ];



  return (
    <section className="w-full relative h-[calc(100vh-3.5rem)]">
    <div className="absolute inset-y-0 z-10 w-full flex  flex-col items-center justify-center">
    <h1 className="text-white font-bold text-5xl text-center">J.I.M.</h1>
    <h2 className="text-gray-300 font-semibold text-lg mt-2">Where Beauty and Talent Converge</h2>
    </div>
  {images.map((image, index) => (
    <div
      key={index}
      className={cn(
        "absolute inset-0 w-full overflow-hidden brightness-50 opacity-0 image-animation"
      )}
      style={{
        animationDelay: `${index * 2}s`,
      
      }}
    >
      <Image src={image.url} fill alt="model" className="object-cover" />
    </div>
  ))}
</section>
  );
}

export default ImageSlider;
