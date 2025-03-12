import React, { useContext, useState } from "react";
import { Avatar, Card, Drawer, Flex, Radio, RadioChangeEvent, Segmented, theme } from "antd";
import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { ThemeContext } from "../../theme/ThemeContext";


type props = {
    open: boolean;
    setOpen: any;
};

const ThemeDrawer = ({ open, setOpen }: props) => {
    const [value, setValue] = useState(1);
    const [themeColor, setThemeColor] = useState("#078DEE")

    const themeContext = useContext(ThemeContext);
    if (!themeContext) return <p>Loading...</p>;

    const { themeMode, primaryColor, toggleTheme, changePrimaryColor } = themeContext;

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        toggleTheme();
    };

    return (
        <Drawer title="Basic Drawer" onClose={() => setOpen(false)} open={open} width={300}>
            <Flex gap="large" vertical>
                <Card size="small" title="Theme">
                    <Radio.Group onChange={onChange} value={value}>
                        <Flex gap="small" vertical>
                            <Radio value={1}>
                                <Flex gap="small" align="center">
                                    <SunOutlined style={{ fontSize: 18 }} />
                                    Light
                                </Flex>
                            </Radio>
                            <Radio value={2}>
                                <Flex gap="small" align="center">
                                    <MoonOutlined style={{ fontSize: 18 }} />
                                    Dark
                                </Flex>
                            </Radio>
                        </Flex>
                    </Radio.Group>
                </Card>
                <Card size="small" title="Theme Colour">
                    <div style={{ padding: "15px 5px" }}>  {/* Adds spacing inside Card */}
                        <Segmented
                            size="middle"
                            value={themeColor}
                            onChange={(color: string) => { changePrimaryColor(color); setThemeColor(color); }}
                            options={[
                                { label: <Avatar size={20} style={{ backgroundColor: '#078DEE' }} />, value: '#078DEE' },
                                { label: <Avatar size={20} style={{ backgroundColor: '#FFA500' }} />, value: '#FFA500' },
                                { label: <Avatar size={20} style={{ backgroundColor: '#0C68E9' }} />, value: '#0C68E9' },
                                { label: <Avatar size={20} style={{ backgroundColor: '#00A76F' }} />, value: '#00A76F' },
                                { label: <Avatar size={20} style={{ backgroundColor: '#FF3030' }} />, value: '#FF3030' },
                            ]}
                            style={{ maxWidth: "100%" }}  // Prevents overflow
                        />
                    </div>
                </Card>
            </Flex>
        </Drawer>
    );
};

export default ThemeDrawer;
