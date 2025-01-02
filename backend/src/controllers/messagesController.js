const Mensagem = require("../models/MessagesModel");
const moment = require("moment");
// const User = require("../models/UserModel");

exports.salvaMensagens = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.message.tempo = momento;

  req.body.message.nome = req.body.nome;

  req.body.message.sobrenome = req.body.sobrenome;

  if (req.body.message.texto === "") return;

  const idUser = req.session.user.id;

  const mensagem = new Mensagem(req.body.message);

  await mensagem.registrarMensagem(req.body.chatRoom, idUser);

  //   enviarNotf(req.body.chatRoom, req, 2, req.body.idUserMsg);
};

exports.carregaMensagens = async (req, res) => {
  const mensagem = new Mensagem(req.params.room);

  const response = await mensagem.carregaMensagens();

  console.log(response);

  res.send(response);
};

exports.curtirMensagem = async (req, res) => {
  const mensagem = new Mensagem(req.body);

  res.send(await mensagem.curtirMensagem());
};

exports.descurtirMensagem = async (req, res) => {
  const mensagem = new Mensagem(req.body);

  res.send(await mensagem.descutirMensagem());
};

exports.compartilharMensagem = async (req, res) => {
  const momento = moment().format("DD/MM HH:mm");

  req.body.user.tempo = momento;

  const mensagem = new Mensagem(req.body);

  await mensagem.compartilhar();
};
