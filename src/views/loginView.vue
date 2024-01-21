<script setup lang="ts">
import LoginForm from '@/components/loginForm.vue';
import Popup from '@/components/pop-up.vue';

</script>

<template>
    <main>
        <Popup title="ATENÇÃO" text="Nós não temos a opção de recuperar a senha/usuário, então não esqueça." />
        <LoginForm />
    </main>
</template>