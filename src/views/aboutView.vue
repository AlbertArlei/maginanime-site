<template>
    <main>
        <div class="about-container">
            <h1>Sobre</h1>
            <p>Bem-vindo ao nosso espaço dedicado à paixão pelos mangás! Este site é resultado do meu primeiro projeto mais
                desafiador, desenvolvido de forma independente. Iniciado modestamente no começo de novembro de 2023, o
                projeto
                foi concluído com sucesso no dia 21 de janeiro de 2024.</p>

            <p>Como único desenvolvedor por trás deste projeto, optei por utilizar tecnologias modernas para garantir
                uma experiência satisfatória aos apreciadores de mangás. No front-end, escolhi Vue 3 para criar uma
                interface
                dinâmica e responsiva..</p>

            <p>No backend, JavaScript em conjunto com o framework Express foi a escolha para construir a API de mangás. O
                banco
                de dados PostgreSQL, gerenciado por Sequelize, armazena os dados de maneira eficiente, enquanto tokens de
                login
                com JWT garantem a segurança e autenticação.</p>

            <p>Para aprimorar o desempenho, adotei o Redis como sistema de cache, proporcionando respostas mais rápidas e
                eficientes. Embora o site não seja perfeito, representou uma valiosa experiência de aprendizado e
                crescimento.
            </p>
        </div>

    </main>
</template>

<script setup lang="ts">

</script>

<style scoped>
h1 {
    color: var(--white-color);
    font-size: 2.5em;
    letter-spacing: 3px;
}

p {
    color: var(--white-color);
    text-align: justify;
    letter-spacing: 1px;
}

.about-container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    align-items: center;
    padding: 20px;
    max-width: 1200px;

}

</style>