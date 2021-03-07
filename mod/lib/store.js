/*
function loadProgress() {
    const rawProgress = window.localStorage.getItem(PROGRESS_STORE)

    if (rawProgress) {
        const progress = JSON.parse(rawProgress)
        if (progress && isObj(progress)) {
            env.level = progress.level
            env.detach(env.score)
            env.attach(progress.score, 'score')
            return progress
        }
    }
}

function saveProgress() {
    const score = augment({}, env.score)
    delete score._
    delete score.__
    delete score.level

    const progress = {
        level: env.level,
        score: score,
    }

    window.localStorage.setItem(PROGRESS_STORE, JSON.stringify(progress))
}

function resetProgress() {
    env.level = 1
    env.score.total = 0
    env.score.level = 0
    lab.hud.score.set(0)
    saveProgress()
}

function removeProgress() {
    window.localStorage.removeItem(PROGRESS_STORE)
}
*/

function loadJSON(key) {
    try {
        const raw = window.localStorage.getItem(key)

        if (raw) {
            return JSON.parse(raw)
        }
    } catch (e) {
        log.error(e)
    }
}

function saveJSON(key, payload) {
    try {
        const json = JSON.stringify(payload)
        window.localStorage.setItem( key, json )
    } catch (e) {
        log.error(e)
    }
}
