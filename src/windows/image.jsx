import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/windows";

const ImageWindow = () => {
    const { windows } = useWindowStore();
    const data = windows.imgfile.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControls target="imgfile" />
                <span className="font-semibold text-gray-500">{data.name}</span>
            </div>
            <div className="bg-white h-full flex flex-col items-center justify-center p-4">
                {data.imageUrl ? (
                    <img
                        src={data.imageUrl}
                        alt={data.name}
                        className="max-w-full max-h-full object-contain shadow-lg rounded-lg"
                    />
                ) : (
                    <div className="text-gray-400">No image available</div>
                )}
            </div>
        </>
    );
};

export default WindowWrapper(ImageWindow, "imgfile");
