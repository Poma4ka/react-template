import {useEffect, useRef, useState} from "react";

export interface LocationInterface {
    href: string
    query: {[k: string]: string}
    hash: string
}

export interface MessageInterface {
    data: any
    location: LocationInterface
    document: Document
}

interface OptionsInterface {
    onClose?() : void
    onMessage?(message: MessageInterface) : void
    width?: number
    height?: number
    tag? : string
    left? : number
    top? : number
    menubar? : boolean
    toolbar? : boolean
    location? : boolean
    status? : boolean
    resizable? : boolean
    scrollbars? : boolean
}

export class windowOpen {

    constructor(
        private url?: string,
        private options?: OptionsInterface,
        private opened?: WindowProxy
    ) {}

    open(link?: string) {
        if (!this.opened) {
            this.opened = window.open(link ?? this.url,this.options?.tag,this.getOptions())
            if (!this.opened) {
                window.localStorage["redirectPage"] = window.location.href
                window.location.assign(link ?? this.url)
            }
            this.createHandlers()
            return true;
        } else {
            this.opened.focus()
            return false;
        }
    }

    close() {
        if (this.opened) {
            this.opened.close()
            this.clearHandlers()
            this.opened = null
            return true;
        }
        return false;
    }

    private getOptions() {
        const optionList = [];

        if (this.options?.width !== undefined) optionList.push(`width=${this.options.width}`)
        if (this.options?.height !== undefined) optionList.push(`height=${this.options.height}`)
        if (this.options?.left !== undefined) optionList.push(`left=${this.options.left}`)
        if (this.options?.top !== undefined) optionList.push(`top=${this.options.top}`)
        if (this.options?.menubar !== undefined) optionList.push(`menubar=${this.options.menubar ? "yes" : "no"}`)
        if (this.options?.toolbar !== undefined) optionList.push(`toolbar=${this.options.toolbar ? "yes" : "no"}`)
        if (this.options?.location !== undefined) optionList.push(`location=${this.options.location ? "yes" : "no"}`)
        if (this.options?.status !== undefined) optionList.push(`status=${this.options.status ? "yes" : "no"}`)
        if (this.options?.resizable !== undefined) optionList.push(`resizable=${this.options.resizable ? "yes" : "no"}`)
        if (this.options?.scrollbars !== undefined) optionList.push(`scrollbars=${this.options.scrollbars ? "yes" : "no"}`)

        return optionList.join(",");
    }

    private onMessage(message) {
        if (message.source === this.opened) {
            if (this.options?.onMessage) {
                this.options.onMessage({
                    document: this.opened.document,
                    data: message.data,
                    location: {
                        href: this.opened.location.href,
                        query: Object.fromEntries(new URLSearchParams(this.opened.location.search)),
                        hash: this.opened.location.hash
                    }
                })
            }
        }
    }

    private closeInterval
    private createHandlers() {
        this.closeInterval = setInterval(() => {
            if (this.opened?.closed) {
                this.options?.onClose()
                this.close()
            }
        },100)
        window.addEventListener("message",this.onMessage.bind(this))
    }

    private clearHandlers() {
        clearInterval(this.closeInterval)
        window.removeEventListener("message",this.onMessage.bind(this))
    }
}

export const useWindowOpen = (url, options?: OptionsInterface) : [(link? : string) => void,() => void,boolean] => {
    const [opened,setOpened] = useState<boolean>(false)
    const newWindow = useRef<windowOpen>()

    useEffect(() => {
        newWindow.current = new windowOpen(url,{
            ...options,
            onClose() {
                setOpened(false)
                options?.onClose?.()
            }
        })
    },[])

    const open = (link) => {
        if (newWindow.current.open(link)) {
            setOpened(true)
        }
    }
    const close = () => {
        if (newWindow.current.close()) {
            setOpened(false)
        }
    }

    return [open,close,opened];
}