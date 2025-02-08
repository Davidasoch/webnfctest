const toggleScanState =  ({
    showWhen,
    children,

}) => {
    if (showWhen) return <>{children}</>;
    return<></>
}
