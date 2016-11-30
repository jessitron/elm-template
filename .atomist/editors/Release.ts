import {ParameterlessProjectEditor} from "@atomist/rug/operations/ProjectEditor"
import {Parameters} from "@atomist/rug/operations/Parameters"
import {Status, Result} from "@atomist/rug/operations/Result"
import {Project} from '@atomist/rug/model/Core'
import {Match} from '@atomist/rug/tree/PathExpression'
import {PathExpression,PathExpressionEngine,TreeNode} from '@atomist/rug/tree/PathExpression'

import {editor, inject} from '@atomist/rug/support/Metadata'

@editor("Release editor")
class Release extends ParameterlessProjectEditor  {

    private eng: PathExpressionEngine;

    constructor(@inject("PathExpressionEngine") _eng: PathExpressionEngine ){
      super();
      this.eng = _eng;
    }

    editWithoutParameters(project: Project): Result {

    let pe = new PathExpression<Project,TreeNode>(
     `/*:file[name='elm-package.json']/->json/summary/[1]`)
    let description: TreeNode = this.eng.scalar(project, pe)

     if (!project.fileExists("README.md")) {
       project.addFile("README.md", `# ${project.name()}

${description.value()}
       `);
     }

     var readme = project.files();

     return new Result(Status.Success, "yay woo");

  }

}
