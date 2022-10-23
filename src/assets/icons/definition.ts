
interface CreateIconOptions {
    name: string
    size: {
        width: number
        height: number
    } | number
    pathData: string
}

export const createIcon = (options: CreateIconOptions) : any => {
    return {
        icon: [
            typeof options.size === "number" ? options.size : options.size.width,
            typeof options.size === "number" ? options.size : options.size.height,
            [],
            null,
            options.pathData
        ],
        prefix: "custom",
        iconName: options.name
    };
}