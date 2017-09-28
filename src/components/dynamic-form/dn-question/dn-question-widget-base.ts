/**
 * Created by cabbar on 27.03.2017.
 */
export class DnQuestionWidgetBase<DnQuestionFormBase>{
  formBase: DnQuestionFormBase;
  title: string;
  column: string;
  id: string;

  constructor(options: {
                formBase?: DnQuestionFormBase,
                title?: string,
                column?: string,
                id?: string
              } = {}) {
    this.formBase = options.formBase;
    this.title = options.title || '';
    this.column = options.column || '';
    this.id = options.id ||  '';
  }
}
