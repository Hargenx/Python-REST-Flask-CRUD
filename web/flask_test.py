from flask import Flask, jsonify, request, render_template

app = Flask(__name__)
#app.config['SECRET_KEY']='XXXXXXX'

'''jogadores = {
    1: {'Nome': 'Gabriel Barbosa', 'Idade': 25, 'Numero': 10, 'Clube': 'Flamengo', 'Posição': 'Atacante'},
    2: {'Nome': 'Du', 'Idade': 28, 'Numero': 8, 'Clube': 'Clube B', 'Posição': 'Meio-campo'},
    # ... Alterar para esse.
}'''


jogadores =[
    {
        "id": 1,
        "Numero": 9,
        "Nome": "Gabriel Barbosa",
        "Idade": 27,
        "Posição": "Atacante",
        "Clube": "Flamengo"
    },
    {
        "id": 2,
        "Numero": 77,
        "Nome": "Du",
        "Idade": 33,
        "Posição": "Meia-nte",
        "Clube": "Palmas"
    },
    {
        "id": 3,
        "Numero": 14,
        "Nome": "Germán Cano",
        "Idade": 37,
        "Posição": "Atacante",
        "Clube": "Fluminense"
    },
    {
        "id": 4,
        "Numero": 8,
        "Nome": "Renato Augusto",
        "Idade": 28,
        "Posição": "Meia",
        "Clube": "Corinthians"
    },
]

@app.route('/jogadores',methods=["GET"])
def get_jogadores():
    return jsonify({'jogadores':jogadores})

@app.route('/jogadores/<int:id>',methods=["GET"])
def get_jogadores_pela_id(id):
    jogador = next((j for j in jogadores if j['id'] == id), None)
    if jogador:
        return jsonify(jogador)
    else:
        return jsonify({'mensagem': 'jogador não encontrado'}), 404


@app.route('/jogadores',methods=["POST"])
def criar_jogador():
    if request.method=='POST':
        dados = request.get_json()
        chaves = ['Numero', 'Nome', 'Idade', 'Posição', 'Clube']
        Chave_faltante = [chave for chave in chaves if chave not in dados]

        if Chave_faltante:
            return jsonify({'erro': f'Dados incompletos. Chaves faltantes: {Chave_faltante}.'}), 400
        
        ultimo_id = max(jogador['id'] for jogador in jogadores)
        novo_id = ultimo_id + 1
        temp = {}
        temp["id"] = novo_id
        temp["Numero"] = dados['Numero']
        temp["Nome"] = dados['Nome']
        temp["Idade"] = dados['Idade']
        temp["Posição"] = dados['Posição']
        temp["Clube"] = dados['Clube']
        jogadores.append(temp)
        return jsonify({'Criado ':temp}),201

    
@app.route('/jogadores/<int:id>',methods=["PUT"])
def atualizar_jogador_completo(id):
    for jogador in jogadores:
        if jogador['id'] == id:
            data = request.get_json()
            jogador.update(data)
            return jsonify({'Atualizado': jogador})
    return jsonify({'mensagem': 'jogador não encontrado'})


@app.route('/jogadores/alterar/<int:id>', methods=["PATCH"])
def atualizar_jogador_parcial(id):
    for jogador in jogadores:
        if jogador['id'] == id:
            for key, value in request.json.items():
                match key:
                    case 'Clube':
                        jogador['Clube'] = value
                    case 'Numero':
                        jogador['Numero'] = value
                    case 'Nome':
                        jogador['Nome'] = value
                    case 'Idade':
                        jogador['Idade'] = value
                    case 'Posição':
                        jogador['Posição'] = value
            return jsonify({'Atualizado': jogador})
    return jsonify({'mensagem': 'jogador não encontrado'})


@app.route('/jogadores/<int:id>',methods=["DELETE"])
def apagar_pela_id(id):
    for i, jogador in enumerate(jogadores):
        if jogador['id'] == id:
            jogadores.pop(i)
            return jsonify({'Apagado': True})
    return jsonify({'mensagem': 'jogador não encontrado'})

@app.route('/')
def menu():
    return render_template('index.html', jogadores=jogadores)

@app.route('/incluir')
def incluir_jogador():
    return render_template('incluir.html')


@app.route('/jogadores/alterar/<int:id>', methods=['GET','PATCH'])
def alterar_jogador(id):
    jogador = next((j for j in jogadores if j['id'] == id), None)
    if jogador:
        return render_template('alterar.html', jogador=jogador)
    else:
        return jsonify({'mensagem': 'jogador não encontrado'}), 404


if __name__ == '__main__':
	app.run(debug=True)