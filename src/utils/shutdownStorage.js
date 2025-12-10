const STORAGE_KEY = 'SHUTDOWN_FORM_DATA'

export function getShutdownData() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
    } catch {
        return []
    }
}

export function saveShutdownData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}
