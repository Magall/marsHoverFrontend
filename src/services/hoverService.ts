import HoverInputDto from "@/Dtos/HoverInputDto"
import Repository from "@/repository"

export default class HoverService {
   private repo = new Repository()
    public async sendInstructions(params: HoverInputDto): Promise<Object> {
        
        return this.repo.hover.sendInstructionsToMars(params)
    }

}