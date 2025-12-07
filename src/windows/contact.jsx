
import WindowWrapper from "#hoc/WindowWrapper";
import WindowControls from "#components/WindowControls";
import { socials } from "#constants";
const Contact = () => {
    return (
        <>
            <div id="window-header">
                <WindowControls target="contact" />
                <h2>Contact Me</h2>
            </div>
            <div className="p-5 space-y-5">
                <img
                    src="/images/me2.jpeg"
                    alt="adrian"
                    className="w-24 h-24 rounded-full"
                />
                <h3>lets connect</h3>
                <p>Got and idea? Or Just wanna talk?</p>
                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{ background: bg }}>
                            <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={text}
                            >
                                <img src={icon} alt={text} className="size-5" />
                                <p>{text}</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default WindowWrapper(Contact, "contact");
