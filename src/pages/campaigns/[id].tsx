import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { Link, animateScroll as scroll, scrollSpy } from "react-scroll";

export default function SingleCampaign() {
  const router = useRouter();
  const [title, setTitle] = useState<String>();
  const [description, setDescription] = useState<String>();
  const [image, setImage] = useState<String>();

  useEffect(() => {
    setTitle(router.query.title);
    setDescription(router.query.description);
    setImage(router.query.image);
  }, [router.query]);

  return (
    <>
      <main>
        <section
          className={
            `overflow-hidden bg-[image:url(` +
            image +
            `)] bg-cover bg-top bg-no-repeat`
          }
        >
          <div className="bg-black/25 p-8 md:p-12 lg:px-16 lg:py-24">
            <div className="text-center ltr:sm:text-left rtl:sm:text-right">
              <h2 className="text-2xl font-bold text-white sm:text-3xl md:text-5xl">
                {title}
              </h2>

              <p className="mx-auto hidden max-w-lg text-center text-white/90 md:mt-6 md:block md:text-lg md:leading-relaxed">
                {description}
              </p>

              <div className="mt-4 sm:mt-8">
                <Link
                  href="#"
                  to="theme"
                  smooth={true}
                  offset={-10}
                  alt="Scroll to first section"
                  className="inline-block rounded-full bg-buttons px-12 py-3 text-sm font-medium text-white transition hover:bg-indigo-500 focus:outline-none"
                >
                  Editar
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="theme"
        >
          <h2 className="mb-2 text-2xl font-bold text-typography md:text-2xl">
            Tema do plano
          </h2>
          <p>
            Este plano de aula busca não apenas a compreensão literária de "O
            Cortiço" mas também o desenvolvimento de uma consciência crítica
            sobre as questões sociais que são tão pertinentes hoje quanto na
            época em que a obra foi escrita. Ao utilizar metodologias ativas, o
            plano visa engajar os alunos de maneira participativa, tornando o
            aprendizado mais dinâmico e significativo.
          </p>
        </section>

        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="goals"
        >
          <h2 className="mb-2 text-2xl font-bold text-typography md:text-2xl">
            Objetivos
          </h2>
          <ol className="ml-3 list-inside list-decimal">
            <li className="mb-2">
              Compreender o contexto histórico-social do Brasil no século XIX e
              a crítica social presente em "O Cortiço".
            </li>
            <li className="mb-2">
              Analisar as personagens e a construção do espaço como reflexo da
              sociedade.
            </li>
            <li className="mb-2">
              Identificar e discutir as principais temáticas como o naturalismo,
              o determinismo e a questão racial e de classe.
            </li>
            <li className="mb-2">
              Desenvolver habilidades de leitura crítica, interpretação e
              análise literária.
            </li>
            <li className="mb-2">
              Estimular a reflexão crítica sobre as questões sociais
              contemporâneas relacionadas às temáticas do livro.
            </li>
          </ol>
        </section>

        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="materials"
        >
          <h2 className="mb-2 text-2xl font-bold text-typography md:text-2xl">
            Materiais
          </h2>
          <ul className="ml-3 list-inside list-disc">
            <li className="mb-2">
              Cópias de trechos selecionados de "O Cortiço".
            </li>
            <li className="mb-2">
              Vídeos de contextualização histórica e análises literárias.
            </li>
            <li className="mb-2">
              Quadro branco, marcadores e material para anotações.
            </li>
            <li className="mb-2">
              Acesso à internet para pesquisa e visualização de conteúdos
              complementares.
            </li>
          </ul>
        </section>

        <section
          className="mx-auto mt-8 max-w-prose text-base leading-relaxed"
          id="methodology"
        >
          <h2 className="mb-2 text-2xl font-bold text-typography md:text-2xl">
            Metodologia
          </h2>
          <ol className="ml-3 list-inside list-decimal">
            <li className="mb-2">
              <strong>Introdução Contextual</strong>: Breve exposição sobre o
              contexto histórico do Brasil no século XIX, focando em aspectos
              sociais, econômicos e culturais relevantes para a compreensão da
              obra.
            </li>
            <li className="mb-2">
              <strong>Leitura Dirigida</strong>: Leitura em grupo de trechos
              selecionados, com pausas para discussão e análise das passagens
              mais significativas.
            </li>
            <li className="mb-2">
              <strong>Grupos de Discussão</strong>: Divisão da classe em grupos
              menores para discutir temas específicos da obra, como a
              representação das classes sociais, o ambiente do cortiço, entre
              outros.
            </li>
            <li className="mb-2">
              <strong>Apresentação e Debate</strong>: Cada grupo apresentará
              suas conclusões e promoverá um debate com a turma, estimulando a
              argumentação crítica e a troca de ideias.
            </li>
            <li className="mb-2">
              <strong>Atividade Criativa</strong>: Propor uma atividade onde os
              alunos possam criar um diálogo, cena teatral ou narrativa baseada
              nos personagens ou temas de "O Cortiço", refletindo a realidade
              contemporânea.
            </li>
          </ol>
        </section>

        <section
          className="texrt-base mx-auto mb-4 mt-8 max-w-prose leading-relaxed"
          id="assessment"
        >
          <h2 className="mb-2 text-2xl font-bold text-typography md:text-2xl">
            Avaliação
          </h2>
          <ul className="ml-3 list-inside list-disc">
            <li className="mb-2">
              Participação ativa nas discussões em sala e nos grupos.
            </li>
            <li className="mb-2">
              Qualidade e profundidade das análises apresentadas nos debates.
            </li>
            <li className="mb-2">
              Criatividade e coerência na atividade criativa.
            </li>
            <li className="mb-2">
              Um breve ensaio ou relatório crítico individual sobre um aspecto
              específico da obra, demonstrando compreensão e reflexão.
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
