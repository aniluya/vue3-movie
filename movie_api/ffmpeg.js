// 引入的node内置包
const exec= require('child_process').exec
const path = require('path')
const fs = require('fs')


/**
 * 将视频格式转换成ts格式
 * @param {string} input 需要转换视频的路径
 * @param {string} output 转换后输出的路径
 * @returns
 */
function VideoToTs(input, output) {
    return new Promise((resolve, reject) => {
        // 定义转换视频的命令
        const command = `ffmpeg -y -i ${input} -vcodec copy -acodec copy -vbsf h264_mp4toannexb ${output}`
        exec(command, (err) => {
            // 执行命令
            if (err) {
                reject(err)
            }
            resolve()
        })
    })
}


/**
 * 视频切片方法
 * @param {string} inputPath 输入视频文件路径
 * @returns string
 */
async function sliceVideoFromFFmpeg(inputPath) {
    // 将视频路径使用path.sep进行分割成数组，path.sep兼容window和linux的路径分隔符
    const pathlist = inputPath.split(path.sep)
    console.log(pathlist)
    // 获取视频路径目录
    const pathDir = pathlist.slice(0, pathlist.length - 1).join(path.sep)
    console.log(pathDir)
    // 获取视频名字
    const tempName = pathlist.at(-1).slice(0, pathlist.at(-1).lastIndexOf('.'))
    console.log(tempName)
    // // 转换成ts格式的视频文件路径
    // const outputPath = path.resolve(`${pathDir}/${tempName}.ts`)
    // console.log(outputPath)
    // 生成视频的索引文件路径
    const m3u8Path = path.resolve(`${pathDir}/index.m3u8`)
    console.log(m3u8Path)
    // 视频切片后每个切片的文件路径
    const videoPath = path.resolve(`${pathDir}/chunk/${tempName}-%04d.ts`)
    console.log(videoPath)
    // 切片命令
    const command = `ffmpeg -i ${tempName}.mp4 -c copy -map 0 -f segment -segment_list ${m3u8Path} -segment_time 200 ${videoPath}`
    //先执行转换格式的方法
    // await VideoToTs(inputPath, outputPath)
    // 创建切片和索引文件存放的目录
    // fs.mkdir(path.join(`${pathDir}`, 'chunk'), (err) => {
    //     if (err) {
    //         console.log(err)
    //     }
    //
    // })
    //执行切片命令
    exec(`ffmpeg -i ${tempName}.mp4 -c:v ` +
        `libx264 -c:a aac -strict -2 -f hls -hls_list_size 0 -hls_time 240 ${m3u8Path}`,
        {cwd: "C:\\web\\static\\movie"},(err, stdout, stderr) => {
            if (err) {
                console.log(err)
            }
            console.log()
        })
    // return m3u8Path
}

module.exports={sliceVideoFromFFmpeg}
