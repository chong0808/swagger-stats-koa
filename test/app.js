const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const sws = require('./../lib');
if (cluster.isMaster) {
    console.log(`主进程 ${process.pid} 正在运行`);
    // 衍生工作进程。
    let child;
    for (let i = 0; i < numCPUs; i++) {
        child = cluster.fork();
    }
    sws.clusterSws()
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork();
        console.log(`工作进程 ${worker.process.pid} 已退出`);
    });

    // cluster.on('disconnect', function() {
    //     clsuter.fork();
    // });
} else {
    require('./server')
    console.log(`工作进程 ${process.pid} 已启动`);
}