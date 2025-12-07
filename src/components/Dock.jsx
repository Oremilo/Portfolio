import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import useWindowStore from "#store/windows";

const Dock = () => {
    const { openWindow, closeWindow, windows } = useWindowStore();
    const dockRef = useRef(null);

    useGSAP(() => {
        const icons = gsap.utils.toArray(".dock-icon");

        const animateIcons = (mouseX) => {
            icons.forEach((icon) => {
                const { left, width } = icon.getBoundingClientRect();
                const center = left + width / 2;
                const distance = Math.abs(mouseX - center);

                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity,
                    y: -15 * intensity,
                    duration: 0.2,
                    ease: "power1.out",
                });
            });
        };

        const handleMouseMove = (e) => {
            animateIcons(e.clientX);
        };

        const resetIcons = () =>
            icons.forEach((icon) =>
                gsap.to(icon, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power1.out",
                })
            );

        const dock = dockRef.current;
        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        };
    }, { scope: dockRef });

    const toggleApp = (app) => {
        if (!app.canOpen) return;
        const window = windows[app.id];

        if (window.isOpen) {
            if (window.isMinimized) {
                openWindow(app.id);
            } else {
                closeWindow(app.id);
            }
        } else {
            openWindow(app.id);
        }
    };

    return (
        <section id="dock">
            <div ref={dockRef} className="dock-container">
                {dockApps.map(({ id, name, icon, canOpen }) => (
                    <div key={id} className="relative flex justify-center">
                        <button
                            type="button"
                            className="dock-icon"
                            aria-label={name}
                            data-tooltip-id="dock-tooltip"
                            data-tooltip-content={name}
                            data-tooltip-delay-show={150}
                            disabled={!canOpen}
                            onClick={() => toggleApp({ id, canOpen })}
                        >
                            <img
                                src={`/images/${icon}`}
                                alt={name}
                                loading="lazy"
                                className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                    </div>
                ))}
                <Tooltip id="dock-tooltip" place="top" className="tooltip" />
            </div>
        </section>
    );
};

export default Dock;