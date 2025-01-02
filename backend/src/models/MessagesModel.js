const mongoose = require("mongoose");

const MensagemSchema = new mongoose.Schema({
  chatRoom: { type: String, required: true },
  mensagem: [
    {
      texto: { type: String, required: true, default: "" },
      idUser: { type: String, required: false, default: "" },
      curtidas: [
        {
          idUser: { type: String, required: false, default: "" },
          _id: false,
        },
      ],
      comentarios: [
        {
          idUser: { type: String, required: false, default: "" },
          comment: { type: String, required: false, default: "" },
          _id: false,
        },
      ],
      tempo: { type: String, required: false, default: "" },
      image: { type: String, required: false, default: "" },
      nome: { type: String, required: false, default: "" },
      sobrenome: { type: String, required: false, default: "" },
    },
  ],
});

const MensagemModel = mongoose.model("Mensagem", MensagemSchema);

class Mensagem {
  constructor(body) {
    this.body = body;
  }

  async registrarMensagem(room, idUser) {
    let searchRoom = await MensagemModel.findOne({ chatRoom: room }).exec();
    let mensagem = null;

    if (searchRoom) {
      mensagem = await MensagemModel.findOneAndUpdate(
        { chatRoom: room },
        {
          $addToSet: {
            mensagem: [
              {
                texto: this.body.texto,
                idUser: idUser,
                tempo: this.body.tempo,
                nome: this.body.nome || "",
                sobrenome: this.body.sobrenome || "",
              },
            ],
          },
        },
        { new: true }
      );
    } else {
      mensagem = await MensagemModel.create({
        chatRoom: room,
        mensagem: [
          {
            texto: this.body.texto,
            idUser: idUser,
            tempo: this.body.tempo,
            nome: this.body.nome || "",
            sobrenome: this.body.sobrenome || "",
          },
        ],
      });
    }

    return mensagem;
  }

  async carregaMensagens() {
    let searchRoom = await MensagemModel.findOne({
      chatRoom: this.body,
    }).exec();

    let mensagens = undefined;

    if (searchRoom) {
      mensagens = searchRoom.mensagem;
    } else {
      mensagens = [];
    }

    return mensagens;
  }
}

module.exports = Mensagem;
