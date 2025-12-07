import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/windows";

const TextWindow = () => {
    const { windows } = useWindowStore();
    const data = windows.txtfile.data;

    if (!data) return null;

    return (
        <>
            <div id="window-header">
                <WindowControls target="txtfile" />
                <span className="font-semibold text-gray-500">{data.name}</span>
            </div>
            <div className="bg-white h-full overflow-y-auto p-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="text-center space-y-4">
                        {data.image && (
                            <img
                                src={data.image}
                                alt={data.name}
                                className="w-32 h-32 mx-auto rounded-full object-cover shadow-lg"
                            />
                        )}
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
                            {data.subtitle && (
                                <p className="text-xl text-gray-500 mt-2">{data.subtitle}</p>
                            )}
                        </div>
                    </div>

                    {data.description && (
                        <div className="space-y-4 text-gray-700 leading-relaxed">
                            {data.description.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default WindowWrapper(TextWindow, "txtfile");
