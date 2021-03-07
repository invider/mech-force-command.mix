function actionLog(msg) {
    log.out(msg)
    actionLog.list.push(msg)
}
actionLog.alias = 'log'
actionLog.list = []

module.exports = actionLog
