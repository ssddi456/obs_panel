import { Button, Popover } from "antd";
import { RgbaColorPicker } from "react-colorful";
import { defaultBackground, formatRgba } from "../utils";

export const ColorPicker = ({ value, onChange }: {
    value?: { r: number, g: number, b: number, a: number },
    onChange?: (v: { r: number, g: number, b: number, a: number }) => void,
}) => {
    return (
        <Popover
            trigger={['click']}
            title={(
                <>
                    <RgbaColorPicker
                        color={value || defaultBackground}
                        onChange={onChange}
                    />
                    最下面一个是透明度
                </>
            )}
        >
            <Button
                style={{
                    backgroundColor: '#fff',
                }}
            >
                <div
                    style={{
                        backgroundColor: formatRgba(value || defaultBackground),
                    }}
                >
                    &nbsp; &nbsp; &nbsp; &nbsp;
                </div>
            </Button>
        </Popover>
    );

}