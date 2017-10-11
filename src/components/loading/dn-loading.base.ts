export class DnLoadingBase {
    protected loading = false;
    // protected readonly context: any;

    // constructor(context: any) {
    //     this.context = context;
    // }

    protected loadingContext(context: any) {
        return {
            context,
            loading: 'loading'
        };
    }
}
