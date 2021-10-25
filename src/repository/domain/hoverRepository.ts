import Client from "@/repository/config/client";
import HoverInputDto from "@/Dtos/HoverInputDto";
import HoverOutputDto from "@/Dtos/HoverOutputDto";
export default class Hover {
   private client = new Client();
    public async sendInstructionsToMars(params: HoverInputDto): Promise<HoverOutputDto> {
        return this.client.post("move", params);
    }
}