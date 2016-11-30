import {ProjectEditor} from "@atomist/rug/operations/ProjectEditor"
import {Parameters} from "@atomist/rug/operations/Parameters"
import {Status, Result} from "@atomist/rug/operations/Result"
import {Project,Pair} from '@atomist/rug/model/Core'
import {Match} from '@atomist/rug/tree/PathExpression'
import {PathExpression,PathExpressionEngine,TreeNode} from '@atomist/rug/tree/PathExpression'

import {editor, inject} from '@atomist/rug/support/Metadata'

@editor("Add Dependency editor")
class AddDependencyTS implements ProjectEditor<Parameters>  {

    private eng: PathExpressionEngine;

    constructor(@inject("PathExpressionEngine") _eng: PathExpressionEngine) {
      this.eng = _eng;
    }

    edit(project: Project, p: Parameters): Result {

      var pe = new PathExpression<Project, Pair>(`/[name='elm-package.json']/->json/dependencies`);
      var n : Pair = this.eng.scalar(project, pe);

      n.addKeyValue(p["dependency_name"], p["dependency_version"])

      return new Result(Status.Success, "yay woo")
    }
  }
