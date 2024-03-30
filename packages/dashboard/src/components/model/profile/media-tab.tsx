import { Model } from "@jimmodel/shared";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import ImageGallery from "../../shared/image-gallery";

export default function ModelMediaTab({model}: {model: Model}){ 
    function renderTabContent(type: string) {
        return (
          <TabsContent value={type}>
            <div className="mt-4">
              <ImageGallery images={model?.images?.filter((image) => image.type == type) || []} />
            </div>
          </TabsContent>
        );
      }
    return (
        <>
        <div>
          <Tabs defaultValue="book" defaultChecked>
            <TabsList className="w-full justify-around">
              <TabsTrigger className="grow" value="book">
                Book
              </TabsTrigger>
              <TabsTrigger className="grow" value="polaroid">
                Polaroid
              </TabsTrigger>
              <TabsTrigger className="grow" value="composite">
                Composite
              </TabsTrigger>
            </TabsList>
            {renderTabContent("book")}
            {renderTabContent("polaroid")}
            {renderTabContent("composite")}
          </Tabs>
        </div>
      </>
    )
}