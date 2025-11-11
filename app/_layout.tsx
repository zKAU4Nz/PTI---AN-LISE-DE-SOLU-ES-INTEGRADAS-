// ARQUIVO: app/_layout.tsx (Ajustado para seu Stack Navigator)

import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* 1. Rota Index.js (Seu Login) */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      
      {/* 2. Rota Cadastro (RegisterScreen.js) */}
      <Stack.Screen 
        name="RegisterScreen" 
        options={{ headerShown: false, title: "Cadastro" }} 
      />

      {/* 3. Rota Home (HomeScreen.js) */}
      <Stack.Screen 
        name="HomeScreen" 
        options={{ headerShown: false, title: "Início" }} 
      />

      {/* 4. Rota Treinos (TrainingScreen.js) */}
      <Stack.Screen 
        name="TrainingScreen" 
        options={{ headerShown: false, title: "Treinos" }} 
      />

      {/* 5. A rota Detalhe (Alongamento) deve ser adicionada aqui também, se precisar */}
      {/* <Stack.Screen name="Detalhe" options={{ headerShown: false }} /> */}

      {/* 6. Impede que a pasta (tabs) apareça na navegação padrão antes do login */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
    </Stack>
  );
}