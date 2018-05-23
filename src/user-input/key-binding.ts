export class KeyBinding {
    private name: string = '';
    private boundKeys: number[] = [];
    private boundParameters: any[] = [];
    private boundAction: Function | undefined;

    constructor(keyBindingName: string) {
        this.name = keyBindingName;
    }

    setKeyBinding(): void {

    }
}