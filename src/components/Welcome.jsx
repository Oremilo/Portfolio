import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 280 },
    title: { min: 100, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, i) => (
        <span
            key={i}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === " " ? "\u00A0" : char}
        </span>
    ));
};

const setupTextHover = (container, type) => {
    if (!container) return;

    const letters = container.querySelectorAll("span");
    const { min, max, default: base } = FONT_WEIGHTS[type];

    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {
            duration,
            ease: "power2.out",
            fontVariationSettings: `'wght' ${weight}`
        });
    };

    let letterCenters = [];
    const calculateCenters = () => {
        const { left: containerLeft } = container.getBoundingClientRect();
        letterCenters = Array.from(letters).map(letter => {
            const { left, width } = letter.getBoundingClientRect();
            return left - containerLeft + width / 2;
        });
    };

    // Calculate initially
    calculateCenters();

    const handleMouseMove = (e) => {
        const { left: containerLeft } = container.getBoundingClientRect();
        const mouseX = e.clientX - containerLeft;

        letters.forEach((letter, i) => {
            const center = letterCenters[i];
            const targetX = center !== undefined ? center : 0;
            const distance = Math.abs(mouseX - targetX);

            // Increased divisor for wider spotlight
            const intensity = Math.exp(-(distance ** 2) / 5000);

            animateLetter(letter, min + (max - min) * intensity);
        });
    };

    const handleMouseLeave = () => {
        letters.forEach((letter) => animateLetter(letter, base, 0.3));
    };

    container.addEventListener("mouseenter", calculateCenters);
    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
        container.removeEventListener("mouseenter", calculateCenters);
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
    };
};

// const Welcome = () => {
//     const titleRef = useRef(null);
//     const subtitleRef = useRef(null);
//     useGSAP(() => {
//         const cleanupTitle = setupTextHover(titleRef.current, 'title');
//         const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle');
//         return () => {
//             if (cleanupTitle) cleanupTitle();
//             if (cleanupSubtitle) cleanupSubtitle();
//         };
//     }, []);

//     return <section id="welcome">
//         <p ref={subtitleRef}>
//             {renderText("Hey , I'm Himanshu! Welcome to my", 'text-3xl font-georama', 100)}</p>
//         <h1 ref={titleRef} className="mt-7">
//             {renderText("portfolio", "text-9xl italic font-georama")}
//         </h1>
//         <div className="small-screen">
//             <p>This Portfolio is designed for desktop?tabled screens Only</p>
//         </div>
//     </section>

// };
const Welcome = () => {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    useGSAP(() => {
        const cleanupTitle = setupTextHover(titleRef.current, 'title');
        const cleanupSubtitle = setupTextHover(subtitleRef.current, 'subtitle');
        return () => {
            if (cleanupTitle) cleanupTitle();
            if (cleanupSubtitle) cleanupSubtitle();
        };
    }, []);

    return (
        <section id="welcome">
            <p ref={subtitleRef}>
                {renderText(
                    "Hey, I'm Himanshu! Welcome to my",
                    "text-4xl italic font-georama font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] tracking-wide",
                    280
                )}
            </p>

            <h1 ref={titleRef} className="mt-10 leading-none">
                {renderText(
                    "portfolio",
                    "text-9xl italic font-georama font-bold text-white drop-shadow-[0_5px_10px_rgba(0,0,0,0.5)] tracking-tight"
                )}
            </h1>

            <div className="small-screen">
                <p>This Portfolio is designed for desktop/tablet screens Only</p>
            </div>
        </section>
    );
};

export default Welcome;