<template>
<div>
    <v-row>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media1.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <video :poster="require('../../../assets/images/product/media3.png')" class="media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-paid-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
                <v-img :src="require('../../../assets/images/structure/play-icon.png')" class="play-icon" />
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media4.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <video :poster="require('../../../assets/images/product/media2.png')" class="media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-paid-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
                <v-img :src="require('../../../assets/images/structure/play-icon.png')" class="play-icon" />
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media5.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media6.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media7.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media8.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media9.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media10.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media11.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media12.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box">
                <v-img :src="require('../../../assets/images/product/media13.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-public-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>        
        <v-col cols="6" sm="4" md="4" lg="3" xl="3">
            <div class="media-box" >
                <v-img :src="require('../../../assets/images/product/media2.png')" class="media-img" />
                <div class="media-hover-box">
                    <div class="d-flex justify-space-between">
                        <v-img :src="require('../../../assets/images/structure/media-group-icon.svg')" class="icon20" />
                        <v-img :src="require('../../../assets/images/structure/delete-white-icon.svg')" class="icon20" @click="deleteMedia = true" />
                    </div>
                    <div class="light-click-box" @click="openMedia = true"></div>
                </div>
            </div>
        </v-col>
    </v-row>
    <v-dialog v-model="deleteMedia" maxWidth="295">
        <v-card class="delete-modal">
            <h4 class="text-h4 mb-2">{{ $t('common.DeletePost') }}</h4>
            <p class="text-body-2 gray mb-5">{{ $t('common.Areyousureyouwanttodeletethispost') }}</p>
            <v-card-actions class="justify-end mb-1">
                <v-btn class="gray" @click="deleteMedia = false">{{ $t('common.Cancel') }}</v-btn>
                <v-btn class="blue">{{ $t('common.Delete') }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-dialog v-model="openMedia" class="media-light-box">
        <v-img @click="openMedia = false" :src="require('../../../assets/images/structure/close-modal.svg')" class="modal-close-icon" />       
        <v-carousel hide-delimiters>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media1.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <video controls autoplay loop :poster="require('../../../assets/images/product/media3.png')" class="lightbox-media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media2.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media4.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media5.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <video controls autoplay loop :poster="require('../../../assets/images/product/media6.png')" class="lightbox-media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media7.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <video controls autoplay loop :poster="require('../../../assets/images/product/media8.png')" class="lightbox-media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media9.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <video controls autoplay loop :poster="require('../../../assets/images/product/media10.png')" class="lightbox-media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media11.png')" class="lightbox-media-img" />
            </v-carousel-item>
            <v-carousel-item>
                <video controls autoplay loop :poster="require('../../../assets/images/product/media12.png')" class="lightbox-media-img"  >
                    <source :src="require('../../../assets/images/product/FaithIN_AppPromo.mp4')" type="video/mp4">
                </video>
            </v-carousel-item>
            <v-carousel-item>
                <v-img :src="require('../../../assets/images/product/media13.png')" class="lightbox-media-img" />
            </v-carousel-item>
        </v-carousel>
        
    </v-dialog>
</div>
</template>

<script>
export default {
    name: 'AllMedia',

     data () {
        return {         
            deleteMedia: false,
            openMedia: false,
        }
    }
}

</script>