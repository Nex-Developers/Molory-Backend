import express from "express"
import path from "path"
import fs from 'fs'

export default () => {
    const router = express.Router()
    router.get('/download/:uploads/:path/:name', (req, res) => {
        // res.type('application/pdf')
        // res.header('Content-Disposition', `attachment; filename="${req.params['name']}.pdf"`)
        // res.send(path.join(__dirname, '../../../public/uploads/'+req.params['path']+'/'+req.params['name'])) 
        const link = path.join(__dirname, '../../../public/uploads/' + req.params['path'] + '/' + req.params['name'])
        const file = fs.readFileSync(link)
        // const stat = fs.statSync(link)
        // res.setHeader('Content-Length', stat.size);
        res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename=quote.pdf');
        res.send(file);
    })

    // router.get('docs/logs')
    // router.get('docs/auth')
    // router.get('docs/user')
    return router
}