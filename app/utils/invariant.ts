function invariant(condition: any, message?: string): asserts condition {
    if(condition) {
        return
    }
    throw new Error(message ?? "Invariant failed")
}
export default invariant