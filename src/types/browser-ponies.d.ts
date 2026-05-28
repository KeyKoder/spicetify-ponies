// Extracted from browserponies.js

declare global {
    interface Window {
        BrowserPonies: BrowserPoniesInstance;
        BrowserPoniesConfig?: BrowserPoniesConfig;
        toggleBrowserPoniesToBackground?: () => void;
    }

    const BrowserPonies: BrowserPoniesInstance;
    const BrowserPoniesConfig: BrowserPoniesConfig | undefined;
    function toggleBrowserPoniesToBackground(): void;

    interface BrowserPoniesConfig {
        baseurl?: string;
        speed?: number | string;
        speakProbability?: number | string;
        dontSpeak?: boolean;
        volume?: number | string;
        interval?: number | string;
        fps?: number | string;
        interactionInterval?: number | string;
        audioEnabled?: boolean | string;
        showFps?: boolean | string;
        preloadAll?: boolean | string;
        showLoadProgress?: boolean | string;
        fadeDuration?: number | string;
        ponies?: any[];
        interactions?: string | any[];
        spawn?: Record<string, number>;
        spawnRandom?: number | string;
        onload?: Function | Function[];
        autostart?: boolean;
        oninit?: Function | Function[];
    }

    interface BrowserPoniesInstance {
        api: BrowserPoniesAPI;
        Util: BrowserPoniesUtil;

        convertPony(ini: string, baseurl?: string): any;
        convertInteractions(ini: string): any[];
        
        addInteractions(interactions: string | any[]): void;
        addInteraction(interaction: any): boolean;
        
        addPonies(ponies: any[]): void;
        addPony(pony: any): boolean;
        
        removePonies(ponies: string[]): void;
        removePony(name: string): void;
        
        spawnRandom(count?: number | string): string[];
        spawn(name: string, count?: number | string): boolean;
        
        unspawn(name: string, count?: number | string): boolean;
        unspawnAll(): void;
        clear(): void;
        
        preloadAll(): void;
        preloadSpawned(): void;
        
        start(): void;
        timer(): number | null;
        stop(): void;
        pause(): void;
        resume(): void;
        
        getAllowDoubleClickControl(): boolean;
        setAllowDoubleClickControl(value: boolean): void;
        
        setInterval(ms: number | string): void;
        getInterval(): number;
        
        setFps(fps: number | string): void;
        getFps(): number;
        
        setInteractionInterval(ms: number | string): void;
        getInteractionInterval(): number;
        
        setSpeakProbability(probability: number | string): void;
        getSpeakProbability(): number;
        
        setDontSpeak(value: boolean): void;
        isDontSpeak(): boolean;
        
        setVolume(value: number | string): void;
        getVolume(): number;
        
        setBaseUrl(url: string): void;
        getBaseUrl(): string;
        
        setSpeed(speed: number | string): void;
        getSpeed(): number;
        
        setAudioEnabled(enabled: boolean | string): void;
        isAudioEnabled(): boolean;
        
        setShowFps(value: boolean | string): void;
        isShowFps(): boolean;
        
        setPreloadAll(all: boolean | string): void;
        isPreloadAll(): boolean;
        
        setShowLoadProgress(show: boolean | string): void;
        isShowLoadProgress(): boolean;
        
        getFadeDuration(): number;
        setFadeDuration(ms: number | string): void;
        
        running(): boolean;
        ponies(): Record<string, any>;
        
        loadConfig(config: BrowserPoniesConfig): void;
        dumpConfig(): Partial<BrowserPoniesConfig>;
        
        togglePoniesToBackground(): void;
    }

    interface BrowserPoniesAPI {
        _executeInInstances(ponyIndex: number | undefined, executeScript: (inst: PonyInstance) => void): boolean;
        _executeInInstance(ponyIndex: number, executeScript: (inst: PonyInstance) => any): any | null;
        
        getInstance(ponyIndex: number): PonyInstance | null;
        getInstances(filter?: (inst: PonyInstance) => boolean): PonyInstance[];
        
        getInstanceController(ponyIndex: number): BrowserPoniesInstanceController;
        
        addTick(callback: (currentTime: number | string, timeSpan?: number, winsize?: {width: number, height: number}) => void): number | null;
        removeTick(tickId: number): boolean;
        
        getDemoGamepad(ponyIndex: number, startByGamepad?: boolean): { start: () => void, apiInstance: BrowserPoniesInstanceController };
        startDemoGamepad(ponyIndex: number): void;
    }

    interface BrowserPoniesInstanceController {
        isDead(): boolean;
        getInstance(): PonyInstance;
        getName(): string;
        addTick(callback: (inst: PonyInstance, currentTime: number | string, timeSpan: number, winsize: {width: number, height: number}) => void): number | null;
        removeTick(tickId: number): boolean;
        setFacingRight(isFacingRight: boolean): void;
        forceBehaviorMoves(forceBehaviorMoves?: boolean): void;
        setBehavior(behaviorName: string, breaklink?: boolean): boolean | null;
        hasBehavior(behaviorName: string): boolean;
        getBehavior(behaviorName: string): any;
        speakRandom(speakProbability?: number, startTime?: number): void;
        speak(speakData?: { text?: string, files?: string | string[] | Record<string, string> }, forceSpeak?: boolean, startTime?: number): void;
        teleport(cords?: { x: number, y: number } | ((winsize: {width: number, height: number}, size: {width: number, height: number}) => { x: number, y: number })): void;
        move(cords?: { x: number, y: number } | ((currRect: {x: number, y: number, width: number, height: number}) => { x: number, y: number })): void;
        start(): void;
        stop(): void;
    }

    interface PonyInstance {
        pony: any;
        img: HTMLImageElement;
        ai_disabled: boolean;
        force_behavior_moves: boolean;
        api_dest_position: { x: number, y: number } | null;
        instance_index: number;
        
        setTopLeftPosition(pos: { x: number, y: number }): void;
        setPosition(pos: { x: number, y: number }): void;
        moveBy(offset: { x: number, y: number }): void;
        clipToScreen(): void;
        topLeftPosition(): { x: number, y: number };
        position(): { x: number, y: number };
        size(): { width: number, height: number };
        rect(): { x: number, y: number, width: number, height: number };
        topLeftRect(): { x: number, y: number, width: number, height: number };
        isOffscreen(): boolean;
        
        printLog(...args: any[]): void;
        imgCheck(): void;
        addTick(tickCall: Function): number | null;
        removeTick(tickIndex: number): boolean;
        createImage(): HTMLImageElement;
        isMouseOverOrDragging(): boolean;
        canDrag(): boolean;
        canMouseOver(): boolean;
        name(): string;
        isDead(): boolean;
        unspawn(): void;
        clear(): void;
        
        interact(currentTime: number, interaction: any, targets: any[]): void;
        speak(currentTime: number, speech: any, forceSpeak?: boolean): void;
        update(currentTime: number, passedTime: number, winsize: { width: number, height: number }): void;
        getNearestInstance(name: string): PonyInstance | null;
        nextBehavior(breaklink?: boolean, behaviorName?: string): void;
        setFacingRight(value: boolean): void;
        behave(behavior: any, moveIntoScreen?: boolean): void;
        teleport(newCords?: { x: number, y: number } | Function): void;
        speakRandom(start_time: number, speak_probability: number): void;
        randomBehavior(forceMovement?: boolean, behaviorName?: string): any;
        loops(instance: any): boolean;
    }

    interface BrowserPoniesUtil {
        setOpacity(element: HTMLElement, opacity: number): void;
        extend(dest: any, src: any): any;
        tag(name: string, ...args: any[]): HTMLElement;
        has(obj: any, name: string): boolean;
        format(fmt: string, ...args: any[]): string;
        partial(fn: Function, ...args: any[]): Function;
        observe(element: HTMLElement | Window | Document, event: string, handler: EventListenerOrEventListenerObject): void;
        stopObserving(element: HTMLElement | Window | Document, event: string, handler: EventListenerOrEventListenerObject): void;
        IE: boolean;
        Opera: boolean;
        Gecko: boolean;
        HasAudio: boolean;
        BaseZIndex: number;
        onload(callback: Function): void;
        onprogress(callback: Function): void;
        $(element_or_id: string | HTMLElement): HTMLElement | null;
        randomSelect<T>(list: T[]): T;
        dataUrl(mimeType: string, data: string): string;
        escapeXml(s: string): string;
        Base64: { encode(input: string): string; decode(input: string): string; };
        PonyINI: { parse(text: string): any[][]; parseLine(line: string, row: any[]): string; };
        getOverlay(): HTMLElement;
        parseBoolean(value: string): boolean;
        parsePoint(value: string | string[]): { x: number, y: number };
        URL: any; 
    }

    var BrowserPoniesBaseConfig: { interactions: string, ponies: { ini: string, baseurl: string }[] };
}

export {};