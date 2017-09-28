export class DnLoadingBase {
    protected loading = false;

    protected loadingContext() {
        // const that = this;
        return {
            // context: that,
            loading: 'loading'
        };
    }
}
