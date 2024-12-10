import React, {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useImperativeHandle,
} from "react";
import Quill from "quill";

// Définitions des types pour les props
interface EditorProps {
  readOnly?: boolean;
  defaultValue?: any; // Contenu initial, peut être un Delta ou un texte brut
  onTextChange?: any; // Callback pour les changements de texte
  onSelectionChange?: any; // Callback pour les changements de sélection
}

// Typage du ref de l'éditeur
export type EditorHandle = Quill | null;

const Editor = forwardRef<EditorHandle, EditorProps>(
  (
    { readOnly = false, defaultValue, onTextChange, onSelectionChange },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null); // Référence pour le conteneur HTML
    const defaultValueRef = useRef(defaultValue); // Référence pour la valeur par défaut
    const onTextChangeRef = useRef(onTextChange); // Référence pour le callback `onTextChange`
    const onSelectionChangeRef = useRef(onSelectionChange); // Référence pour le callback `onSelectionChange`

    // Mise à jour des callbacks à chaque rendu
    useLayoutEffect(() => {
      onTextChangeRef.current = onTextChange;
      onSelectionChangeRef.current = onSelectionChange;
    });

    // Gestion du mode lecture seule
    useEffect(() => {
      if (ref && typeof ref !== "function" && ref.current) {
        ref.current.enable(!readOnly);
      }
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      // Création et ajout du conteneur Quill
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement("div")
      );

      const quill = new Quill(editorContainer, {
        theme: "snow", // Thème de Quill
      });

      // Mise à jour du ref externe
      if (typeof ref === "function") {
        ref(quill);
      } else if (ref) {
        ref.current = quill;
      }

      // Chargement de la valeur par défaut
      if (defaultValueRef.current) {
        quill.setContents(defaultValueRef.current);
      }

      // Gestion des événements Quill
      quill.on("text-change", (...args) => {
        onTextChangeRef.current?.(...args);
      });

      quill.on("selection-change", (...args) => {
        onSelectionChangeRef.current?.(...args);
      });

      return () => {
        if (typeof ref === "function") {
          ref(null);
        } else if (ref) {
          ref.current = null;
        }

        container.innerHTML = ""; // Nettoyage du conteneur
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  }
);

Editor.displayName = "Editor";

export default Editor;
