        /**
         * script.js
         * Efeito de Digitação (Typing Effect), Alternância de Tema (Dark/Light Mode) e Paralaxe
         */

        document.addEventListener('DOMContentLoaded', () => {
            // ====================================================================
            // 1. EFEITO DE DIGITAÇÃO (TYPING EFFECT)
            // ====================================================================
            const targetElement = document.querySelector('header .intro h1');
            if (targetElement) {
                const textToType = "Kebeli Rodrigues";
                let charIndex = 0;
                const typingSpeed = 100;

                targetElement.textContent = '';

                function type() {
                    if (charIndex < textToType.length) {
                        targetElement.textContent += textToType.charAt(charIndex);
                        charIndex++;
                        setTimeout(type, typingSpeed);
                    }
                }
                type();
            }

            // ====================================================================
            // 2. LÓGICA DO MENU HAMBÚRGUER
            // ====================================================================
            const menuToggle = document.getElementById('menu-toggle');
            const navMenu = document.getElementById('nav-menu');

            if (menuToggle && navMenu) {
                menuToggle.addEventListener('click', () => {
                    navMenu.classList.toggle('active');
                    menuToggle.innerHTML = navMenu.classList.contains('active') ? '&#10005;' : '&#9776;'; // X ou Hambúrguer
                });

                // Fechar o menu ao clicar em um link (para navegação suave)
                navMenu.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', () => {
                        navMenu.classList.remove('active');
                        menuToggle.innerHTML = '&#9776;';
                    });
                });
            }

            // ====================================================================
            // 3. ALTERNÂNCIA DE TEMA (DARK/LIGHT MODE)
            // ====================================================================
            const themeToggle = document.getElementById('theme-toggle');
            const root = document.documentElement; // O elemento <html>

            // Função para aplicar o tema
            function applyTheme(theme) {
                if (theme === 'light') {
                    root.classList.add('light-theme');
                    themeToggle.innerHTML = '&#9788;'; // Ícone do Sol
                } else {
                    root.classList.remove('light-theme');
                    themeToggle.innerHTML = '&#9790;'; // Ícone da Lua
                }
            }

            // 3.1. Carregar o tema salvo ou usar o padrão (dark)
            const savedTheme = localStorage.getItem('theme') || 'dark';
            applyTheme(savedTheme);

            // 3.2. Adicionar o listener de clique
            themeToggle.addEventListener('click', () => {
                const currentTheme = root.classList.contains('light-theme') ? 'light' : 'dark';
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

                // Aplicar e salvar o novo tema
                applyTheme(newTheme);
                localStorage.setItem('theme', newTheme);
            });

            // ====================================================================
            // 4. EFEITO PARALAXE (JS para maior compatibilidade)
            // ====================================================================
            const paralaxElement = document.querySelector('header .paralax-bg');
            const headerElement = document.querySelector('header');

            if (paralaxElement && headerElement) {
                window.addEventListener('scroll', () => {
                    // Calcula a posição de rolagem
                    const scrollPosition = window.pageYOffset;
                    
                    // Aplica um deslocamento de 50% da rolagem para o efeito suave
                    // O efeito é aplicado ao elemento de fundo dentro do header
                    paralaxElement.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
                });
            }

            // ====================================================================
            // 5. BOTÃO VOLTAR AO TOPO (BACK TO TOP)
            // ====================================================================
            const backToTopButton = document.getElementById('back-to-top');
            const scrollThreshold = 300; // Distância em pixels para o botão aparecer

            window.addEventListener('scroll', () => {
                if (window.pageYOffset > scrollThreshold) {
                    backToTopButton.classList.add('show');
                } else {
                    backToTopButton.classList.remove('show');
                }
            });

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth' // Rolagem suave
                });
            });

            // ====================================================================
            // 6. FILTRO DE PROJETOS POR CATEGORIA
            // ====================================================================
            const filterButtons = document.querySelectorAll('.filter-btn');
            const projectRows = document.querySelectorAll('#projects-table tbody tr');

            function filterProjects(filter) {
                projectRows.forEach(row => {
                    const categories = row.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        row.style.display = ''; // Mostra a linha
                    } else {
                        row.style.display = 'none'; // Esconde a linha
                    }
                });
            }

            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove a classe 'active' de todos os botões
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    
                    // Adiciona a classe 'active' ao botão clicado
                    this.classList.add('active');
                    
                    // Executa a filtragem
                    const filterValue = this.getAttribute('data-filter');
                    filterProjects(filterValue);
                });
            });

            // Garante que todos os projetos sejam exibidos na carga inicial
            filterProjects('all');
        });
