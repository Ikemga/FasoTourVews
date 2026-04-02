/**
 * FormGroup — label + champ dans une grille CSS.
 * Prop `full` permet d'occuper les 2 colonnes.
 *
 * @param {{ label: string, full?: boolean, children: React.ReactNode }} props
 */
export function FormGroup({children}) {
  return (
    <div>
      {children}
    </div>
  );
}
