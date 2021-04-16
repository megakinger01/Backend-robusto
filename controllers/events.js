const { response } = require('express')
const Evento = require('../models/Evento')


const getEvento = async (req, res = response) => {

    const eventos = await Evento.find()
        .populate('user', 'name')


    res.json({
        ok: true,
        eventos

    })

}


const crearEvento = async (req, res = response) => {

    const evento = new Evento(req.body)

    try {

        evento.user = req.uid

        const eventoGuardado = await evento.save()

        res.status(200).json({
            ok: true,
            msg: ' evento creado',
            evento: eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })

    }

}


const actualizarEvento = async (req, res = response) => {

    const eventoId = req.params.id;
    const uid = req.uid


    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'no existe evento por ese ID'
            })
        }

        if (evento.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'no puede editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })

        res.json({
            ok: true,
            evento: eventoActualizado
        })


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }
}


const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid


    try {

        const evento = await Evento.findById(eventoId)

        if (!evento) {
            res.status(404).json({
                ok: false,
                msg: 'no existe evento por ese ID'
            })
        }

        if (evento.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'no puede editar este evento'
            })
        }


        await Evento.findByIdAndDelete(eventoId)

        res.json({ ok: true });


    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'por favor hable con el administrador'
        })
    }

}


module.exports = {
    getEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}
